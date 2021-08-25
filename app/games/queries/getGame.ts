import { NotFoundError, resolver } from "blitz"
import db from "db"
import { GetGame } from "../validations"

export default resolver.pipe(resolver.zod(GetGame), async ({ id }) => {
  const game = await db.game.findFirst({
    where: { id },
    include: {
      _count: {
        select: {
          players: true,
        },
      },
      winner: true,
    },
  })

  if (!game) throw new NotFoundError()

  return game
})
