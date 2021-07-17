import { Suspense, useEffect } from "react"
import { BlitzPage, getAntiCSRFToken, useParam, useQuery, useSession } from "blitz"
import Layout from "app/core/layouts/Layout"
import { LoadingSpinner } from "../../core/components/LoadingSpinner"
import getGame from "../../games/queries/getGame"
import Lobby from "../../games/components/Lobby"
import { Game } from "../../games/components/Game"

import { JoinGameModal } from "../../games/components/JoinGameModal"
import { useBeforeunload } from "react-beforeunload"

export const GameLoader = () => {
  const session = useSession()
  const gameId = useParam("gameId", "string")
  const [game, { refetch }] = useQuery(
    getGame,
    { id: gameId },
    {
      refetchOnWindowFocus: false,
    }
  )
  const antiCSRFToken = getAntiCSRFToken()

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

  if (session.gameId) {
    if (game.started && !game.finished) {
      return <Game />
    } else if (!game.started && !game.finished) {
      return <Lobby game={game} refetch={refetch} />
    } else {
      return <></>
    }
  } else {
    if (!game.started && !game.finished) {
      return (
        <>
          <JoinGameModal />
        </>
      )
    } else {
      return <></>
    }
  }
}

const ShowGamePage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<LoadingSpinner />}>
        <GameLoader />
      </Suspense>
    </div>
  )
}

ShowGamePage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowGamePage
