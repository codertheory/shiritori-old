import { useParam, useQuery } from "blitz"
import getGame from "../queries/getGame"

export const Game = () => {
  const gameId = useParam("gameId", "string")
  const [game, { refetch }] = useQuery(getGame, { id: gameId })
  return <></>
}
