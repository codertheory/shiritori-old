import { Ctx, resolver } from "blitz"
import db from "db"
import { CreatePlayer } from "../validations"

export default resolver.pipe(resolver.zod(CreatePlayer), async (input, ctx: Ctx) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const player = await db.player.create({ data: input })

  await ctx.session.$setPublicData({
    playerId: player.id,
    playerName: player.name,
    gameId: input.gameId,
    role: "Player",
  })

  return player
})
