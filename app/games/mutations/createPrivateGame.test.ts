import { Ctx, SessionContext } from "blitz"
import createGame from "./createPrivateGame"
import db from "db"
import { mockContextSession } from "../../../test/setup"

beforeEach(async () => {
  await db.$reset()
})

describe("createGame mutation", () => {
  it("creates The Game Correctly", async () => {
    await expect(
      createGame(
        {
          name: "John",
          private: false,
        },
        {
          session: mockContextSession,
        } as Ctx
      )
    ).resolves.not.toThrow()
    expect(mockContextSession.$setPublicData).toBeCalled()
  })
})
