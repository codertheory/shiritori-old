import { z } from "zod"

export const UpdatePlayer = z.object({
  id: z.string(),
  name: z.string(),
  score: z.number().optional(),
  lastWord: z.string().nonempty(),
  active: z.boolean().default(false),
})

export const playerName = z.object({
  name: z.string().min(3, "Usernames Must have 3 characters"),
})

export const CreatePlayer = playerName.extend({
  gameId: z.string(),
})
