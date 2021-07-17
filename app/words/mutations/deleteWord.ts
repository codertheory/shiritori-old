import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteWord = z.object({
  id: z.string(),
})

export default resolver.pipe(resolver.zod(DeleteWord), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const word = await db.word.deleteMany({ where: { id } })

  return word
})
