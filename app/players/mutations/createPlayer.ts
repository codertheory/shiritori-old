import { Ctx, resolver } from "blitz"
import db from "db"
import { CreatePlayer } from "../validations"

export default resolver.pipe(resolver.zod(CreatePlayer), async (input, ctx: Ctx) => {
  const player = await db.player.create({ data: input })

  await ctx.session.$setPublicData({
    playerId: player.id,
    playerName: player.name,
    gameId: input.gameId,
    role: "PLAYER",
  })

  return player
})
