import { Suspense, useEffect } from "react"
import { BlitzPage, getAntiCSRFToken, useParam, useQuery, useSession } from "blitz"
import Layout from "app/core/layouts/Layout"
import { LoadingSpinner } from "../../core/components/LoadingSpinner"
import getGame from "../../games/queries/getGame"
import Lobby from "../../games/components/Lobby"
import { GameLoader } from "../../games/components/GameLoader"

import { JoinGameModal } from "../../games/components/JoinGameModal"
import { useBeforeunload } from "react-beforeunload"
import { useChannel, useEvent } from "@harelpls/use-pusher"
import { useErrorToast } from "../../core/hooks/useErrorToast"

export const GameManager = ({ gameId }: { gameId?: string }) => {
  const session = useSession()
  const channel = useChannel(gameId)
  const errorToast = useErrorToast()

  const [game, { refetch }] = useQuery(getGame, { id: gameId })
  const antiCSRFToken = getAntiCSRFToken()

  const refreshGame = async () => {
    try {
      await refetch()
    } catch (error) {
      errorToast({ message: error.toString() })
    }
  }

  useEvent(channel, "game-started", async (data) => {
    await refreshGame()
    game.started = true
  })

  useEvent(channel, "game-finished", async (data) => {
    await refreshGame()
    game.finished = true
  })

  useEvent(channel, "player-created", async (data) => {
    await refreshGame()
  })

  useBeforeunload((event) => {
    if (session.playerId) {
      window
        .fetch(`/api/games/${gameId}/${session.playerId}/leave`, {
          credentials: "include",
          headers: {
            "anti-csrf": antiCSRFToken,
          },
        })
        .then((r) => null)
    }
  })

  useEffect(() => {}, [game.started, game.finished])

  return (
    <>
      {game.started && session.playerId !== undefined && <GameLoader />}

      {!game.started && session.playerId !== undefined && <Lobby game={game} />}

      {!game.started && !game.finished && session.playerId === undefined && <JoinGameModal />}
    </>
  )
}

const ShowGamePage: BlitzPage = () => {
  const gameId = useParam("gameId", "string")
  return (
    <div>
      <Suspense fallback={<LoadingSpinner />}>
        <GameManager gameId={gameId} />
      </Suspense>
    </div>
  )
}

ShowGamePage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowGamePage
