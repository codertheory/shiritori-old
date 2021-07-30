import { Ctx } from "blitz"
import createGame from "./createPrivateGame"
import { mockContextSession } from "../../../test/setup"

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
