import {
  Box,
  Button,
  Center,
  Divider,
  GridItem,
  Heading,
  Input,
  Modal,
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
import { Routes, useMutation, useRouter } from "blitz"
import { Game as ShiritoriGame, Player } from "db"
import { CountDown } from "./CountDown"
import { FORM_ERROR, GameForm } from "./forms/GameForm"
import updateGame from "../mutations/updateGame"
import { UpdateGame } from "../validations"
import { useState } from "react"
import { useChannel, useEvent, useTrigger } from "@harelpls/use-pusher"

const Lobby = ({ game }: { game: ShiritoriGame & { players: Player[] } }) => {
  const [gameData, setGameData] = useState<any>(undefined)
  const channel = useChannel(game.id)
  const trigger = useTrigger(game.id)
  const color = useColorModeValue("gray.700", "white")
  const [updateGameMutation] = useMutation(updateGame)
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { value, hasCopied, onCopy } = useClipboard(window.location.href)

  useEvent(channel, "game-started", async (data) => {
    onOpen()
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
                <GameForm
                  submitText="Start Game"
                  schema={UpdateGame}
                  initialValues={{}}
                  onSubmit={async (values) => {
                    setGameData(values)
                    await trigger("game-started", { id: game.id })
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
              <LobbyPlayerList gameId={game.id} />
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

      <Modal
        onClose={onClose}
        size="md"
        isOpen={isOpen}
        isCentered
        autoFocus
        blockScrollOnMount
        closeOnEsc={false}
        closeOnOverlayClick={false}
      >
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
      </Modal>
    </>
  )
}

export default Lobby
