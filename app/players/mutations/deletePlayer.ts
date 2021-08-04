import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeletePlayer = z.object({
  id: z.string(),
})

export default resolver.pipe(resolver.zod(DeletePlayer), async ({ id }) => {
  return await db.player.deleteMany({ where: { id } })
})
