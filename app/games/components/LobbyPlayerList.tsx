import { Wrap, WrapItem } from "@chakra-ui/react"
import PlayerLobbyCard from "../../players/components/PlayerLobbyCard"
import { useQuery } from "blitz"
import getGamePlayers from "../queries/getGamePlayers"

export const LobbyPlayerList = ({ gameId }: { gameId: string }) => {
  const [players] = useQuery(getGamePlayers, { id: gameId })

  return (
    <Wrap spacing="30px">
      {players.map((player) => {
        return (
          <WrapItem key={player.id}>
            <PlayerLobbyCard player={player} />
          </WrapItem>
        )
      })}
    </Wrap>
  )
}
