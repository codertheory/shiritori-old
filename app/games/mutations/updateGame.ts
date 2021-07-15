import { resolver } from "blitz"
import db from "db"
import { UpdateGame } from "../validations"

export default resolver.pipe(resolver.zod(UpdateGame), async ({ id, ...data }) => {
  const game = await db.game.update({
    where: { id },
    data,
  })
  return game
})
