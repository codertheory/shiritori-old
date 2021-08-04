import db, { Game } from "db"
import createPlayer from "./createPlayer"
import { mockContextSession } from "../../../test/setup"
import { Ctx } from "blitz"

describe("Create Player Mutation Tests", () => {
  let game: Game

  beforeEach(async () => {
    game = await db.game.create({ data: { private: false } })
  })

  it("Successfully Creates a Player", async () => {
    await expect(
      createPlayer(
        {
          name: "Foo",
          gameId: game.id,
        },
        {
          session: mockContextSession,
        } as Ctx
      )
    ).resolves.not.toThrow()
  })
})
