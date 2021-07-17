import { Suspense, useEffect } from "react"
import { BlitzPage, getAntiCSRFToken, useParam, useQuery } from "blitz"
import Layout from "app/core/layouts/Layout"
import { LoadingSpinner } from "../../core/components/LoadingSpinner"
import getGame from "../../games/queries/getGame"
import Lobby from "../../games/components/Lobby"
import { Game } from "../../games/components/Game"
import { globalState, GlobalStateType } from "../../auth/state"
import { useState } from "@hookstate/core"
import { JoinGameModal } from "../../games/components/JoinGameModal"
import { useBeforeunload } from "react-beforeunload"

export const GameLoader = () => {
  const state = useState<GlobalStateType>(globalState)
  const gameId = useParam("gameId", "string")
  const [game] = useQuery(getGame, { id: gameId })
  const antiCSRFToken = getAntiCSRFToken()

  useBeforeunload((event) => {
    if (state.playerId.value) {
      window
        .fetch(`/api/games/${gameId}/${state.playerId.value}/leave`, {
          credentials: "include",
          headers: {
            "anti-csrf": antiCSRFToken,
          },
        })
        .then((r) => null)
    }
  })

  useEffect(() => {}, [game.started, game.finished])

  if (state.value?.gameId) {
    if (game.started && !game.finished) {
      return <Game />
    } else if (!game.started && !game.finished) {
      return <Lobby />
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
