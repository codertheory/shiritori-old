import { z } from "zod"

export const playerName = z.object({
  name: z.string().min(3, "Usernames Must have 3 characters"),
})

export const CreatePlayer = playerName.extend({
  gameId: z.string(),
})
