import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateWord = z.object({
  playerId: z.string(),
  gameId: z.string(),
  word: z.string(),
  points: z.number(),
})

export default resolver.pipe(resolver.zod(CreateWord), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const word = await db.word.create({ data: input })

  return word
})
