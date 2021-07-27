import { resolver } from "blitz"
import db from "db"
import { z } from "zod"
import { Typo } from "typo-js-ts"

const typo = new Typo("en_US")
const wordLengthMultiplier = 1.25
const durationMultiplier = 1.3

export const calcWordScore = (word: string, totalElapsedTime: number) =>
  Math.round(word!.length * wordLengthMultiplier * (totalElapsedTime * durationMultiplier))

const CreateWord = z.object({
  playerId: z.string(),
  gameId: z.string(),
  word: z
    .string()
    .refine(async (value) => {
      if (value.length > 0) {
        const dict = await typo.ready
        return dict.check(value)
      } else {
        return true
      }
    }, "Invalid Word")
    .default(""),
  totalElapsedTime: z.number().default(1),
})

export default resolver.pipe(
  resolver.zod(CreateWord),
  async ({ word, totalElapsedTime, ...input }) => {
    return await db.word.create({
      data: {
        points: calcWordScore(word, totalElapsedTime),
        word: word!,
        ...input,
      },
    })
  }
)
