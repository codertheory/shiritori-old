import { resolver } from "blitz"
import db from "db"
import { CreatePlayer } from "../validations"

export default resolver.pipe(resolver.zod(CreatePlayer), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const player = await db.player.create({ data: input })

  return player
})
