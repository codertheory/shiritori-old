import { resolver } from "blitz"
import db from "db"
import { z } from "zod"
import { Typo } from "typo-js-ts"

const typo = new Typo("en_US")

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
    .optional(),
})

export default resolver.pipe(
  async (input) => CreateWord.parseAsync(input),
  async ({ word, ...input }) => {
    const game = await db.game.findUnique({
      where: { id: input.gameId },
      select: {
        index: true,
        lastWord: true,
        players: {
          orderBy: {
            order: "asc",
          },
        },
      },
    })

    const starting = game!.index === game!.players!.length ? game!.index : game!.index + 1
    const nextIndex = starting % game!.players!.length
    const nextPlayer = game!.players[nextIndex]
    const transactions: any[] = [
      db.game.update({
        where: { id: input.gameId },
        data: {
          lastWord: word ?? game!.lastWord,
          index: nextPlayer!.order,
        },
      }),
    ]

    if (word) {
      const wordScore = Math.round(word!.length * 1.25)
      transactions.push(
        db.word.create({
          data: {
            points: wordScore,
            word: word!,
            ...input,
          },
        })
      )
      transactions.push(
        db.player.update({
          where: { id: input.playerId },
          data: {
            score: {
              decrement: wordScore,
            },
            lastWord: word,
          },
        })
      )
    } else {
      transactions.push(
        db.player.update({
          where: { id: input.playerId },
          data: {
            score: {
              increment: 15,
            },
          },
        })
      )
    }

    const response = await db.$transaction(transactions)

    console.log(response)

    return word
  }
)
