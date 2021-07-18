import { Ctx, resolver } from "blitz"
import db from "db"
import { CreatePlayer } from "../validations"

export default resolver.pipe(resolver.zod(CreatePlayer), async (input, ctx: Ctx) => {
  const game = await db.game.findUnique({
    where: { id: input.gameId },
    include: {
      _count: {
        select: {
          players: true,
        },
      },
    },
  })

  const player = await db.player.create({
    data: { order: game!._count!.players, ...input },
  })

  await ctx.session.$setPublicData({
    playerId: player.id,
    playerName: player.name,
    gameId: input.gameId,
    role: "PLAYER",
  })

  return player
})
