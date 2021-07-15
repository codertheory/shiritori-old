import { Suspense, useEffect } from "react"
import { BlitzPage, useParam, useQuery, useRouter } from "blitz"
import Layout from "app/core/layouts/Layout"
import { LoadingSpinner } from "../../core/components/LoadingSpinner"
import getGame from "../../games/queries/getGame"
import Lobby from "../../games/components/Lobby"
import { Game } from "../../games/components/Game"

export const GameLoader = () => {
  const router = useRouter()
  const gameId = useParam("gameId", "string")
  const [game] = useQuery(getGame, { id: gameId })

  useEffect(() => {}, [game.started, game.finished])

  router.beforePopState((state) => {
    console.log(state)
    return true
  })

  if (game.started && !game.finished) {
    return <Game game={game} />
  } else if (!game.started && !game.finished) {
    return <Lobby game={game} />
  } else {
    return <></>
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
