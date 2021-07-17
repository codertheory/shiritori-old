import { useParam, useQuery } from "blitz"
import getGame from "../queries/getGame"
import { SimpleGrid } from "@chakra-ui/react"

export const Game = () => {
  const gameId = useParam("gameId", "string")
  const [game, { refetch }] = useQuery(getGame, { id: gameId })
  return <SimpleGrid></SimpleGrid>
}
