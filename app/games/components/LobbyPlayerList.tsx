import { Wrap, WrapItem } from "@chakra-ui/react"
import PlayerLobbyCard from "../../players/components/PlayerLobbyCard"
import { useQuery } from "blitz"
import getGamePlayers from "../queries/getGamePlayers"
import { useChannel, useEvent } from "@harelpls/use-pusher"

export const LobbyPlayerList = ({ gameId }: { gameId: string }) => {
  const [players, { refetch }] = useQuery(getGamePlayers, { id: gameId })
  const channel = useChannel(gameId)

  useEvent(channel, "player-joined", async (data) => {
    await refetch()
  })

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
