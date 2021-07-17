import { Game, Player } from "db"
import { useEffect } from "react"
import { Box, Divider, Flex, Heading, Stack, useColorModeValue } from "@chakra-ui/react"
import { CountDown } from "../../games/components/CountDown"
import { GameWordForm } from "../../games/components/forms/GameWordForm"
import { TakeTurn } from "../../games/validations"
import { useTrigger } from "@harelpls/use-pusher"
import { useSession } from "blitz"

const PlayerScore = ({ score }: { score: number }) => {
  return <p>{score}</p>
}

export const PlayerGameCard = ({ player, game }: { player: Player; game: Game }) => {
  const session = useSession()
  const isPlayer = session.playerId === player.id
  const isCurrentPlayer = isPlayer && player.active
  const trigger = useTrigger(game.id!)
  useEffect(() => {}, [player])

  return (
    <Box
      maxW={"250px"}
      bg={useColorModeValue("white", "gray.800")}
      boxShadow={"2xl"}
      rounded={"md"}
      borderWidth="1px"
      borderRadius="md"
      border={isCurrentPlayer ? "thick double #32a1ce;" : ""}
      overflow={"hidden"}
    >
      <Flex justify={"center"}>
        {player.active && (
          <CountDown
            countdownKey={player.id}
            strokeWidth={2}
            isPlaying={player.active}
            size={75}
            duration={game.timer}
            colors={[["#308f8e", 0.33]]}
          />
        )}
        {!player.active && <Box boxSize={75} />}
      </Flex>
      <Divider pt={5} />
      <Box p={6}>
        <Stack spacing={0} align={"center"} mb={5}>
          <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
            {player.name}
          </Heading>
          <Heading>
            <PlayerScore score={player.score} />
          </Heading>
        </Stack>

        <Stack spacing={0} align={"center"} mb={5}>
          <Heading fontSize={"1xl"} fontWeight={200} fontFamily={"body"}>
            {player.lastWord}
          </Heading>
        </Stack>

        <GameWordForm
          isActivePlayer={isPlayer && player.active}
          schema={TakeTurn}
          onSubmit={async (values) => {}}
        />
      </Box>
    </Box>
  )
}
