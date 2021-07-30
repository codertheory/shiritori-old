import takeTurn, { TakeTurn } from "./takeTurn"
import db, { Game, Player } from "db"
import { beforeEach } from "@jest/globals"
import { mockContextSession } from "../../../test/setup"
import { Ctx } from "blitz"
import { z } from "zod"

describe("Take Turn Mutation Tests", () => {
  let game: Game
  let player: Player
  let takeTurnPayload: z.infer<typeof TakeTurn>
  const session = {
    session: mockContextSession,
  } as Ctx

  beforeEach(async () => {
    game = await db.game.create({
      data: {
        private: false,
        lastWord: "Ready",
      },
    })
    player = await db.player.create({
      data: {
        gameId: game.id,
        name: "Mellow",
        lastWord: "ready",
      },
    })
    takeTurnPayload = {
      playerId: player.id,
      gameId: game.id,
      word: "Yellow",
      totalElapsedTime: 1,
    }
  })

  it("Decrements Score", async () => {
    const updatedPlayer = await takeTurn(takeTurnPayload, session)
    expect(updatedPlayer.score).toBeLessThan(player.score)
    expect(updatedPlayer.lastWord).toEqual(takeTurnPayload.word)
  })

  it("Increments Score", async () => {
    takeTurnPayload.word = ""
    const updatePlayer = await takeTurn(takeTurnPayload, session)

    expect(updatePlayer.score).toBeGreaterThan(player.score)
    expect(updatePlayer.lastWord).toEqual(player.lastWord)
  })
})
