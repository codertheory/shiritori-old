import { NotFoundError, resolver } from "blitz"
import db from "db"
import { GetGame } from "../validations"

export default resolver.pipe(resolver.zod(GetGame), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const game = await db.game.findFirst({
    where: { id },
    include: {
      _count: {
        select: {
          players: true,
        },
      },
    },
  })

  if (!game) throw new NotFoundError()

  return game
})
