import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteWord = z.object({
  id: z.string(),
})

export default resolver.pipe(resolver.zod(DeleteWord), resolver.authorize(), async ({ id }) => {
  return await db.word.deleteMany({ where: { id } })
})
