import { NotFoundError, resolver } from "blitz"
import db from "db"
import { GetGame } from "../../games/validations"

export default resolver.pipe(resolver.zod(GetGame), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const players = await db.player.findMany({
    where: { gameId: id },
  })

  if (!players) throw new NotFoundError()

  return players
})
