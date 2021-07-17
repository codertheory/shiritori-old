import { createState } from "@hookstate/core"

export type GlobalStateType = {
  playerId?: string
  gameId?: string
  host: boolean
}

export const globalState = createState<GlobalStateType>({
  host: false,
})
