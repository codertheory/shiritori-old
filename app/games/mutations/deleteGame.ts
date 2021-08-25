import { resolver } from "blitz"
import db from "db"
import { DeleteGame } from "../validations"

export default resolver.pipe(resolver.zod(DeleteGame), resolver.authorize(), async ({ id }) => {
  return await db.game.deleteMany({ where: { id } })
})
