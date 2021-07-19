import { NextApiRequest, NextApiResponse } from "next"
import handler from "./leave"
import { createMocks } from "node-mocks-http"
import db from "db"

const sessionData = {
  gameId: "ABCD",
  playerId: "EFGH",
  playerName: "Mellow",
}

jest.mock("blitz", () => ({
  ...jest.requireActual<object>("blitz")!,
  getSession: jest.fn(async (req, res) => sessionData),
}))

jest.mock("pusher")

describe("Leave Endpoint", () => {
  const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
    method: "GET",
    query: {
      gameId: sessionData.gameId,
      playerId: sessionData.playerId,
    },
  })

  const createPlayer = async (data) => {
    await db.player.create({
      data: data,
    })
  }

  beforeEach(async () => {
    await db.$reset()
    await db.game.create({
      data: {
        id: sessionData.gameId,
      },
    })
  })

  it("Attempt to leave when player already deleted", async () => {
    await expect(handler(req, res)).rejects.toMatchObject({ code: "P2025" }) // P2025 Means entity could not be found to be deleted
  })

  it("Deletes Player when more than 1 person remains", async () => {
    await createPlayer({
      gameId: sessionData.gameId,
      id: sessionData.playerId,
      name: sessionData.playerName,
      order: 0,
    })
    await createPlayer({
      gameId: sessionData.gameId,
      name: sessionData.playerName,
      order: 1,
    })
    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
    const game = await db.game.findFirst({
      where: { id: sessionData.gameId },
    })
    expect(game).not.toBeNull()
  })

  it("Deletes the Player and the game when last to leave", async () => {
    await createPlayer({
      gameId: sessionData.gameId,
      id: sessionData.playerId,
      name: sessionData.playerName,
    })
    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
    const game = await db.game.findFirst({
      where: { id: sessionData.gameId },
      include: { players: true },
    })
    expect(game).toBeNull()
  })

  it("Returns 403 when Non Session user requests", async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: "GET",
      query: {
        gameId: "123123123",
        playerId: sessionData.playerId,
      },
    })
    await handler(req, res)
    expect(res._getStatusCode()).toBe(403)
  })
})
