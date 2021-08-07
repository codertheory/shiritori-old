import db, { Player } from "db"
import deletePlayer from "./deletePlayer"
import { mockContextSession } from "../../../test/setup"
import { Ctx } from "blitz"

describe("Delete Player Mutation Tests", () => {
  let player: Player

  beforeEach(async () => {
    const game = await db.game.create({ data: { private: false } })
    player = await db.player.create({
      data: {
        gameId: game.id,
        name: "Yolo",
      },
    })
  })

  it("Successfully Deletes a Player", async () => {
    await expect(
      deletePlayer(
        {
          id: player.id,
        },
        {
          session: mockContextSession,
        } as Ctx
      )
    ).resolves.not.toThrow()

    await expect(db.player.findFirst({ where: { id: player.id } })).resolves.toBeNull()
  })
})
