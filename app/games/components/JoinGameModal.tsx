import { Routes, useMutation, useParam, useRouter } from "blitz"
import { ModalBody, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import { FORM_ERROR, JoinGameForm } from "./forms/JoinGameForm"
import createPlayer from "../../players/mutations/createPlayer"
import { UnCloseableModal } from "../../core/components/UnCloseableModal"
import { CreatePlayer } from "../../players/validations"
import { useTrigger } from "@harelpls/use-pusher"
import { useState } from "@hookstate/core"
import { globalState } from "../../auth/state"

export const JoinGameModal = () => {
  const state = useState(globalState)
  const router = useRouter()
  const gameId = useParam("gameId", "string")
  const trigger = useTrigger(gameId!)
  const { onClose } = useDisclosure()
  const [createPlayerMutation] = useMutation(createPlayer)

  return (
    <UnCloseableModal isOpen onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Join Game</ModalHeader>
        <ModalBody>
          <JoinGameForm
            initialValues={{ gameId }}
            schema={CreatePlayer}
            submitText="Join Game"
            onSubmit={async (values) => {
              try {
                const player = await createPlayerMutation({
                  gameId: gameId!,
                  name: values.name,
                })
                state.set({
                  playerId: player.id,
                  gameId: gameId!,
                })
                await trigger("player-created", {})
                await router.replace(Routes.ShowGamePage({ gameId: gameId! }))
              } catch (error) {
                return {
                  [FORM_ERROR]: error.toString(),
                }
              }
            }}
          />
        </ModalBody>
      </ModalContent>
    </UnCloseableModal>
  )
}
