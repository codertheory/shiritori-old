import { resolver } from "blitz"
import db from "db"
import { UpdatePlayer } from "../validations"

export default resolver.pipe(resolver.zod(UpdatePlayer), async ({ id, ...data }) => {
  return await db.player.update({ where: { id }, data })
})
