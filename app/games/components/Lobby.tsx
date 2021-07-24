import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Input,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Tooltip,
  useClipboard,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react"
import { Card } from "../../core/components/Card"
import { LobbyPlayerList } from "./LobbyPlayerList"
import { useMutation, useParam, useSession } from "blitz"
import { CountDown } from "./CountDown"
import { FORM_ERROR, GameSettingsForm } from "./forms/GameSettingsForm"
import updateGame from "../mutations/updateGame"
import { UpdateGameSettings } from "../validations"
import { Suspense, useState } from "react"
import { useChannel, useEvent, useTrigger } from "@harelpls/use-pusher"
import { UnCloseableModal } from "../../core/components/UnCloseableModal"
import { LoadingSpinner } from "../../core/components/LoadingSpinner"
import { Role } from "../../../types"
import { useErrorToast } from "../../core/hooks/useErrorToast"

const Lobby = ({ game }) => {
  const gameId = useParam("gameId", "string")
  const [gameSettings, setGameSettings] = useState<any>(undefined)
  const channel = useChannel(gameId)
  const trigger = useTrigger(gameId!)
  const color = useColorModeValue("gray.700", "white")
  const [updateGameMutation] = useMutation(updateGame)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { value, hasCopied, onCopy } = useClipboard(window.location.href)
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
      console.error(error)
      errorToast({ message: error.toString() })
    }
  }

  const submitSettingsForm = async (values) => {
    if (isHost) {
      try {
        if (game!._count!.players > 1) {
          setGameSettings(values)
          await trigger("game-countdown-started", { id: gameId })
        } else {
          errorToast({ message: "Cannot start a game with less than 2 players" })
          return {
            [FORM_ERROR]: "",
          }
        }
      } catch (error) {
        return {
          [FORM_ERROR]: error.toString(),
        }
      }
    }
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
      <Box p={25}>
        <Grid p={25} templateRows="repeat(2, 1fr)" templateColumns="repeat(5, 1fr)" gap={4}>
          <GridItem rowSpan={2} colSpan={1}>
            <Card h={"100%"}>
              <Heading color={color} fontSize={"2xl"} fontFamily={"body"}>
                Game Settings
              </Heading>
              <Divider />
              <Box pt={15}>
                <GameSettingsForm
                  schema={UpdateGameSettings}
                  submitText="Start Game"
                  submitButtonProps={{
                    disabled: !isHost,
                  }}
                  initialValues={{ timer: 15 }}
                  onSubmit={submitSettingsForm}
                />
              </Box>
            </Card>
          </GridItem>
          <GridItem colSpan={4} rowSpan={1}>
            <Card h={"100%"} w={"100%"}>
              <Heading color={color} fontSize={"2xl"} fontFamily={"body"}>
                Players
              </Heading>
              <Divider />
              <Suspense fallback={<LoadingSpinner />}>
                <LobbyPlayerList gameId={gameId!} />
              </Suspense>
            </Card>
          </GridItem>
          <GridItem colSpan={4}>
            <Card>
              <Heading color={color} fontSize={"2xl"} fontFamily={"body"}>
                Invite your friends!
              </Heading>
              <SimpleGrid mt={10} mb={10}>
                <GridItem>
                  <Tooltip>
                    <Input
                      textAlign={"center"}
                      value={value}
                      isReadOnly
                      placeholder="Invite Link"
                    />
                  </Tooltip>
                </GridItem>
                <GridItem>
                  <Center>
                    <Button w={"50%"} mt={5} onClick={onCopy} ml={2}>
                      {hasCopied ? "Copied" : "Copy"}
                    </Button>
                  </Center>
                </GridItem>
              </SimpleGrid>
            </Card>
          </GridItem>
        </Grid>
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
