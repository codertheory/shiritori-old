import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateWord = z.object({
  playerId: z.string(),
  gameId: z.string(),
  word: z.string(),
  points: z.number(),
})

export default resolver.pipe(resolver.zod(CreateWord), async (input) => {
  const word = await db.word.create({
    data: input,
  })
  const game = await db.game.findUnique({
    where: { id: input.gameId },
    select: {
      index: true,
      players: {
        orderBy: {
          order: "asc",
        },
      },
    },
  })
  const nextIndex = (game!.index + 1) % game!.players!.length
  const nextPlayer = game!.players[nextIndex]

  await db.game.update({
    where: { id: input.gameId },
    data: {
      lastWord: word.word,
      index: nextPlayer!.order,
    },
  })
  return word
})
