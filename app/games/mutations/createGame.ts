import { Ctx, resolver } from "blitz"
import db from "db"
import { CreateGame } from "../validations"

export default resolver.pipe(resolver.zod(CreateGame), async ({ name, ...input }, ctx: Ctx) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const game = await db.game.create({
    data: {
      players: {
        create: [
          {
            name,
          },
        ],
      },
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
