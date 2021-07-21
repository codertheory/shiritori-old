import { Ctx, resolver } from "blitz"
import db from "db"
import { CreateGame } from "../validations"

const alphabet = "abcdefghijklmnopqrstuvwxyz"

export default resolver.pipe(resolver.zod(CreateGame), async ({ name, ...input }, ctx: Ctx) => {
  const game = await db.game.create({
    data: {
      players: {
        create: [
          {
            name,
          },
        ],
      },
      lastWord: alphabet[Math.floor(Math.random() * alphabet.length)],
      ...input,
    },
    include: {
      players: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  })

  await ctx.session.$setPublicData({
    playerId: game.players[0]!.id,
    playerName: game.players[0]!.name,
    gameId: game.id,
    role: "HOST",
  })

  return game
})
