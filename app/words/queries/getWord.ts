import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetWord = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.string().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetWord), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const word = await db.word.findFirst({ where: { id } })

  if (!word) throw new NotFoundError()

  return word
})
