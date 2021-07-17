import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetPlayer = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.string().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetPlayer), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const player = await db.player.findFirst({ where: { id } })

  if (!player) throw new NotFoundError()

  return player
})
