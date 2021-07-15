import { resolver } from "blitz"
import db from "db"
import { CreateGame } from "../validations"

export default resolver.pipe(resolver.zod(CreateGame), async ({ player, ...input }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const game = await db.game.create({
    data: {
      players: {
        create: [
          {
            name: player.name,
          },
        ],
      },
      ...input,
    },
  })

  return game
})
