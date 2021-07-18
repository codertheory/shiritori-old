import { NotFoundError, resolver } from "blitz"
import db from "db"
import { GetGame } from "../validations"

export default resolver.pipe(resolver.zod(GetGame), async ({ id }) => {
  const players = await db.player.findMany({
    where: { gameId: id },
  })

  if (!players) throw new NotFoundError()

  return players
})
