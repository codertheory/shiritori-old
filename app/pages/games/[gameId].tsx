import { Suspense, useEffect } from "react"
import {
  BlitzPage,
  getAntiCSRFToken,
  useMutation,
  useParam,
  useQuery,
  useRouter,
  useSession,
} from "blitz"
import Layout from "app/core/layouts/Layout"
import { LoadingSpinner } from "../../core/components/LoadingSpinner"
import getGame from "../../games/queries/getGame"
import Lobby from "../../games/components/Lobby"
import { GameLoader } from "../../games/components/GameLoader"

import { JoinGameModal } from "../../games/components/JoinGameModal"
import { useBeforeunload } from "react-beforeunload"
import { useChannel, useEvent } from "@harelpls/use-pusher"
import { useErrorToast } from "../../core/hooks/useErrorToast"
import { UnCloseableModal } from "../../core/components/UnCloseableModal"
import {
  Button,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react"
import logoutMutation from "../../auth/mutations/logout"

export const GameManager = () => {
  const router = useRouter()
  const [logout] = useMutation(logoutMutation)
  const session = useSession()
  const gameId = useParam("gameId", "string")
  const channel = useChannel(gameId)
  const errorToast = useErrorToast()

  const [game, { refetch }] = useQuery(getGame, { id: gameId }, {})
  const antiCSRFToken = getAntiCSRFToken()

  const redirectToHome = async () => {
    await logout()
    await router.replace("/")
  }

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
      {game.started && <GameLoader />}

      {!game.started && <Lobby game={game} />}

      {!game.started && !game.finished && session.playerId === undefined && <JoinGameModal />}

      <UnCloseableModal isOpen={game.finished} onClose={() => {}}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Game Finished</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Congratulations {game.winner?.name}</ModalBody>

          <ModalFooter>
            <Button variant="ghost" onClick={redirectToHome}>
              Go Home
            </Button>
          </ModalFooter>
        </ModalContent>
      </UnCloseableModal>
    </>
  )
}

const ShowGamePage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<LoadingSpinner />}>
        <GameManager />
      </Suspense>
    </div>
  )
}

ShowGamePage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowGamePage
