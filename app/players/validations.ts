import { z } from "zod"

export const UpdatePlayer = z.object({
  id: z.string(),
  score: z.union([
    z.number().optional(),
    z
      .object({
        decrement: z.number(),
        increment: z.number(),
      })
      .partial(),
  ]),
  lastWord: z.string().nonempty().optional(),
})

export const playerName = z.object({
  name: z.string().min(3, "Usernames Must have 3 characters"),
})

export const CreatePlayer = playerName.extend({
  gameId: z.string(),
})
