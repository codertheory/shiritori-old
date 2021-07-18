import { useParam, useQuery } from "blitz"
import { Center, useDisclosure, Wrap, WrapItem } from "@chakra-ui/react"
import { Suspense, useEffect } from "react"
import getGamePlayers from "../queries/getGamePlayers"
import { PlayerGameCard } from "../../players/components/PlayerGameCard"
import getGame from "../queries/getGame"
import { LoadingSpinner } from "../../core/components/LoadingSpinner"
import { useChannel, useEvent } from "@harelpls/use-pusher"
import getWords from "../../words/queries/getWords"
import { Word } from "db"

const GamePlayerList = ({ gameId }: { gameId: string }) => {
  const [game] = useQuery(
    getGame,
    { id: gameId },
    {
      enabled: false,
    }
  )
  const [players, { refetch }] = useQuery(
    getGamePlayers,
    { id: gameId },
    {
      enabled: false,
    }
  )
  const channel = useChannel(gameId)

  useEvent(channel, "turn-taken", async (data) => {
    await refetch()
  })

  useEffect(() => {}, [gameId])

  return (
    <Wrap spacing={75} py={50}>
      {players!.map((player) => (
        <WrapItem px={150} key={player.id}>
          <PlayerGameCard player={player} game={game!} />
        </WrapItem>
      ))}
    </Wrap>
  )
}

const GameWord = ({ word }: { word: Word }) => {
  return <></>
}

const GameWordList = ({ gameId }: { gameId: string }) => {
  const [words] = useQuery(getWords, {
    where: {
      gameId,
    },
  })

  return <></>
}

export const Game = () => {
  const gameId = useParam("gameId", "string")

  useEffect(() => {}, [gameId])

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Center>
        <GamePlayerList gameId={gameId!} />
      </Center>
      <GameWordList gameId={gameId!} />
    </Suspense>
  )
}
