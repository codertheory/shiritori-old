import { useParam, useQuery } from "blitz"
import { Center, Wrap, WrapItem } from "@chakra-ui/react"
import { Suspense, useEffect } from "react"
import { PlayerGameCard } from "../../players/components/PlayerGameCard"
import { LoadingSpinner } from "../../core/components/LoadingSpinner"
import { useChannel, useEvent } from "@harelpls/use-pusher"
import getWords from "../../words/queries/getWords"
import { Game, Player, Word } from "db"
import getGameWithPlayers from "../queries/getGameWithPlayers"

type GameWithPlayers = Game & {
  winner: Player | null
  players: Player[]
}

const GameUI = ({ gameId }) => {
  const [game, { refetch }] = useQuery(getGameWithPlayers, { id: gameId })
  const channel = useChannel(gameId)

  useEvent(channel, "turn-taken", async (data) => {
    await refetch()
  })

  useEffect(() => {}, [gameId])
  return (
    <>
      <Center>
        <GamePlayerList game={game} />
      </Center>
      {/*<GameWordList gameId={gameId!} />*/}
    </>
  )
}

const GamePlayerList = ({ game }: { game: GameWithPlayers }) => {
  return (
    <Wrap spacing={75} py={50}>
      {game.players!.map((player) => (
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

export const GameLoader = () => {
  const gameId = useParam("gameId", "string")

  useEffect(() => {}, [gameId])

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <GameUI gameId={gameId} />
    </Suspense>
  )
}
