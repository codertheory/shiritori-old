import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdatePlayer = z.object({
  id: z.string(),
  name: z.string(),
  score: z.number().optional(),
  lastWord: z.string().nonempty(),
  active: z.boolean().default(false),
})

export default resolver.pipe(resolver.zod(UpdatePlayer), async ({ id, ...data }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const player = await db.player.update({ where: { id }, data })

  return player
})
