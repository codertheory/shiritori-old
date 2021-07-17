import { Wrap, WrapItem } from "@chakra-ui/react"
import PlayerLobbyCard from "../../players/components/PlayerLobbyCard"
import { useQuery } from "blitz"
import getGamePlayers from "../queries/getGamePlayers"
import { useChannel, useEvent } from "@harelpls/use-pusher"

export const LobbyPlayerList = ({ gameId }: { gameId: string }) => {
  const channel = useChannel(gameId)
  const [players, { refetch }] = useQuery(getGamePlayers, { id: gameId })

  useEvent(channel, "player-created", async (data) => {
    await refetch()
  })

  useEvent(channel, "player-deleted", async ({ id }) => {
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
