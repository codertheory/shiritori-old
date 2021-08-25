import {
  Box,
  Button,
  Center,
  Grid,
  GridItem,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useClipboard,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react"
import { Card } from "../../core/components/Card"
import { LobbyPlayerListCard } from "./LobbyPlayerListCard"
import { useMutation, useParam, useSession } from "blitz"
import { CountDown } from "./CountDown"
import { GameSettingsForm } from "./forms/GameSettingsForm"
import updateGame from "../mutations/updateGame"
import { Suspense, useState } from "react"
import { useChannel, useEvent, useTrigger } from "@harelpls/use-pusher"
import { UnCloseableModal } from "../../core/components/UnCloseableModal"
import { LoadingSpinner } from "../../core/components/LoadingSpinner"
import { Role } from "../../../types"
import { useErrorToast } from "../../core/hooks/useErrorToast"
import { UpdateGameSettings } from "../validations"

const Lobby = ({ game }) => {
  const gameId = useParam("gameId", "string")
  const [gameSettings, setGameSettings] = useState<any>(undefined)
  const channel = useChannel(gameId)
  const trigger = useTrigger(gameId!)
  const [updateGameMutation] = useMutation(updateGame)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { onCopy } = useClipboard(window.location.href)
  const session = useSession()
  const isHost = (session.role as Role) === "HOST"
  const errorToast = useErrorToast()

  useEvent(channel, "game-countdown-started", async (data) => {
    onOpen()
  })

  const startGame = async () => {
    try {
      await updateGameMutation({ id: gameId!, started: true, ...gameSettings })
      await trigger("game-started", {})
    } catch (error) {
      errorToast({ message: error.toString() })
    }
  }

  const submitSettingsForm = async (values) => {
    console.log(values)
    // if (isHost) {
    //   try {
    //     if (game!._count!.players > 1) {
    //       setGameSettings(values)
    //       await trigger("game-countdown-started", { id: gameId })
    //     } else {
    //       errorToast({ message: "Cannot start a game with less than 2 players" })
    //       return {
    //         [FORM_ERROR]: ""
    //       }
    //     }
    //   } catch (error) {
    //     return {
    //       [FORM_ERROR]: error.toString()
    //     }
    //   }
    // }
  }

  const onCountDownFinish = (totalElapsedTime: number) => {
    if (isHost) {
      startGame().then(() => onClose())
    } else {
      onClose()
    }
  }

  return (
    <>
      <Box p={100} h={"75%"}>
        <Card h={800}>
          <Grid h={"100%"} templateRows="repeat(2, 1fr)" templateColumns="repeat(5, 1fr)" gap={4}>
            <GridItem rowSpan={2} colSpan={1}>
              <Card
                px={3}
                width={"100%"}
                height={"100%"}
                bg={useColorModeValue("white", "gray.900")}
              >
                <Suspense
                  fallback={
                    <Center>
                      <LoadingSpinner />
                    </Center>
                  }
                >
                  <LobbyPlayerListCard gameId={gameId!} />
                </Suspense>
              </Card>
            </GridItem>
            <GridItem rowSpan={2} colSpan={4}>
              <GameSettingsForm
                id={"game-settings-form"}
                schema={UpdateGameSettings}
                initialValues={{ timer: 15 }}
                onSubmit={submitSettingsForm}
              />
              <Center>
                <Button w={"200px"} mt={5} onClick={onCopy} ml={2}>
                  Invite
                </Button>
                <Button
                  type={"submit"}
                  form={"game-settings-form"}
                  disabled={!isHost}
                  w={"200px"}
                  mt={5}
                  ml={2}
                >
                  Start
                </Button>
              </Center>
            </GridItem>
          </Grid>
        </Card>
      </Box>

      <UnCloseableModal onClose={onClose} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Center>Starting</Center>
          </ModalHeader>
          <ModalBody>
            <Center>
              <CountDown duration={5} onComplete={onCountDownFinish} />
            </Center>
          </ModalBody>
        </ModalContent>
      </UnCloseableModal>
    </>
  )
}

export default Lobby
