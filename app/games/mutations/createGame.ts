import { resolver } from "blitz"
import db from "db"
import { CreateGame } from "../validations"

export default resolver.pipe(resolver.zod(CreateGame), async ({ name, ...input }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const game = await db.game.create({
    data: {
      players: {
        create: [
          {
            name,
          },
        ],
      },
      ...input,
    },
    include: {
      players: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  })
  return game
})
