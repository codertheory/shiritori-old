import { resolver } from "blitz"
import db from "db"
import { UpdatePlayer } from "../validations"

export default resolver.pipe(resolver.zod(UpdatePlayer), async ({ id, ...data }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const player = await db.player.update({ where: { id }, data })

  return player
})
