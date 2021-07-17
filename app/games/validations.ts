import { z } from "zod"
import { playerName } from "../players/validations"

export const GetGame = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.string().optional().refine(Boolean, "Required"),
})

export const DeleteGame = z.object({
  id: z.string(),
})

const minTimer = 10
const maxTimer = 60

export const UpdateGame = z.object({
  id: z.string(),
  started: z.boolean().optional(),
  finished: z.boolean().optional(),
  timer: z.number().min(10, "Timer must be greater than 10").max(60, "Timer must be less than 60"),
  currentPlayerId: z.string().optional(),
  lastWord: z.string().nonempty().optional(),
  winnerId: z.string().nonempty().optional(),
  index: z.number().optional(),
})

export const CreateGame = playerName.extend({
  private: z.boolean().default(false),
})
