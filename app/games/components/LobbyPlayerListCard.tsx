import { Box, Center, Divider, Heading, useColorModeValue } from "@chakra-ui/react"
import PlayerLobbyCard from "../../players/components/PlayerLobbyCard"
import { useQuery } from "blitz"
import getGamePlayers from "../queries/getGamePlayers"
import { useChannel, useEvent } from "@harelpls/use-pusher"

export const LobbyPlayerListCard = ({ gameId }: { gameId: string }) => {
  const color = useColorModeValue("gray.700", "white")
  const channel = useChannel(gameId)
  const [players, { refetch }] = useQuery(getGamePlayers, { id: gameId })

  useEvent(channel, "player-created", async (data) => {
    await refetch()
  })

  useEvent(channel, "player-deleted", async ({ id }) => {
    await refetch()
  })

  return (
    <Box>
      <Center>
        <Heading color={color} fontSize={"2xl"} alignContent={"center"} fontFamily={"body"}>
          players - {players.length}
        </Heading>
      </Center>
      <Divider />
      {players.map((player) => {
        return <PlayerLobbyCard key={player.id} player={player} />
      })}
    </Box>
  )
}
