import {
  Box,
  Button,
  Center,
  Divider,
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
import { Routes, useMutation, useParam, useQuery, useRouter } from "blitz"
import { CountDown } from "./CountDown"
import { FORM_ERROR, GameSettingsForm } from "./forms/GameSettingsForm"
import updateGame from "../mutations/updateGame"
import { UpdateGame } from "../validations"
import { Suspense, useState } from "react"
import { useChannel, useEvent, useTrigger } from "@harelpls/use-pusher"
import { UnCloseableModal } from "../../core/components/UnCloseableModal"
import getGame from "../queries/getGame"
import { globalState, GlobalStateType } from "../../auth/state"
import { useState as globalUseState } from "@hookstate/core"
import { LoadingSpinner } from "../../core/components/LoadingSpinner"

const Lobby = () => {
  const gameId = useParam("gameId", "string")
  const [game, { refetch }] = useQuery(getGame, { id: gameId })
  const [gameData, setGameData] = useState<any>(undefined)
  const channel = useChannel(gameId)
  const trigger = useTrigger(gameId!)
  const color = useColorModeValue("gray.700", "white")
  const [updateGameMutation] = useMutation(updateGame)
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { value, hasCopied, onCopy } = useClipboard(window.location.href)
  const state = globalUseState<GlobalStateType>(globalState)

  useEvent(channel, "game-started", async (data) => {
    onOpen()
  })

  useEvent(channel, "player-created", async (data) => {
    await refetch()
  })

  useEvent(channel, "player-deleted", async ({ id }) => {
    await refetch()
  })

  const startGame = async () => {
    try {
      const game = await updateGameMutation(gameData)
      await router.push(Routes.ShowGamePage({ gameId: game.id }))
    } catch (error) {
      console.error(error)
      return {
        [FORM_ERROR]: error.toString(),
      }
    }
  }

  return (
    <>
      <Box p={25}>
        <SimpleGrid p={25} columns={2} spacingX="40px" spacingY="20px">
          <GridItem>
            <Card>
              <Heading color={color} fontSize={"2xl"} fontFamily={"body"}>
                Game Settings
              </Heading>
              <Divider />
              <Box pt={15}>
                <GameSettingsForm
                  schema={UpdateGame}
                  submitText="Start Game"
                  submitButtonProps={{
                    disabled: !state.host.value,
                  }}
                  initialValues={{ timer: 15 }}
                  onSubmit={async (values) => {
                    if (state.host.value) {
                      setGameData(values)
                      await trigger("game-started", { id: game.id })
                    }
                  }}
                />
              </Box>
            </Card>
          </GridItem>
          <GridItem>
            <Card>
              <Heading color={color} fontSize={"2xl"} fontFamily={"body"}>
                Players
              </Heading>
              <Divider />
              <Suspense fallback={<LoadingSpinner />}>
                <LobbyPlayerList gameId={game.id} />
              </Suspense>
            </Card>
          </GridItem>
        </SimpleGrid>
        <Card>
          <Heading color={color} fontSize={"2xl"} fontFamily={"body"}>
            Invite your friends!
          </Heading>
          <SimpleGrid mt={10} mb={10}>
            <GridItem>
              <Tooltip>
                <Input textAlign={"center"} value={value} isReadOnly placeholder="Invite Link" />
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
      </Box>

      <UnCloseableModal onClose={onClose} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Center>Starting</Center>
          </ModalHeader>
          <ModalBody>
            <Center>
              <CountDown
                duration={5}
                onComplete={(totalElapsedTime) => {
                  onClose()
                }}
              />
            </Center>
          </ModalBody>
        </ModalContent>
      </UnCloseableModal>
    </>
  )
}

export default Lobby
