import { resolver } from "blitz"
import db from "db"
import { DeleteGame } from "../validations"

export default resolver.pipe(resolver.zod(DeleteGame), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const game = await db.game.deleteMany({ where: { id } })

  return game
})
