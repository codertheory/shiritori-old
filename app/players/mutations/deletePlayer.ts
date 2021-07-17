import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeletePlayer = z.object({
  id: z.string(),
})

export default resolver.pipe(resolver.zod(DeletePlayer), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const player = await db.player.deleteMany({ where: { id } })

  return player
})
