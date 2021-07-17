import { createState } from "@hookstate/core"

export type GlobalStateType = {
  playerId?: string
  gameId?: string
}

export const globalState = createState<GlobalStateType>({})
