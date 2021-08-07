import { CreateWord } from "./createWord"
import cuid from "cuid"

describe("Create Word Mutation Tests", () => {
  it("Parses Valid Word", async () => {
    await expect(
      CreateWord.parseAsync({
        playerId: cuid(),
        gameId: cuid(),
        word: "Interesting",
      })
    ).resolves.not.toThrow()
  })

  it("Errors on Invalid Word", async () => {
    await expect(
      CreateWord.parseAsync({
        playerId: cuid(),
        gameId: cuid(),
        word: "asdasd",
      })
    ).rejects.toThrow()
  })
})
