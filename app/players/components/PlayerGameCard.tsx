import { Game, Player } from "db"
import React, { useEffect } from "react"
import {
  Box,
  Center,
  Divider,
  Flex,
  Heading,
  Stack,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react"
import { CountDown } from "../../games/components/CountDown"
import { FORM_ERROR, GameWordForm } from "../../games/components/forms/GameWordForm"
import { TakeTurn } from "../../games/validations"
import { useTrigger } from "@harelpls/use-pusher"
import { useMutation, useSession } from "blitz"
import AnimatedNumber from "animated-number-react"
import { CountdownCircleTimerProps } from "react-countdown-circle-timer"
import takeTurnMutation from "../../games/mutations/takeTurn"

const PlayerScore = ({ score }: { score: number }) => {
  const formatValue = (value: number) => value.toFixed(2)

  useEffect(() => {}, [score])

  return (
    <Stat pt={6}>
      <StatLabel>
        <Center>Score</Center>
      </StatLabel>
      <StatNumber>
        <AnimatedNumber value={score <= 0 ? 0 : score} formatValue={formatValue} />
      </StatNumber>
    </Stat>
  )
}

export const PlayerGameCard = ({ player, game }: { player: Player; game: Game }) => {
  const session = useSession()
  const isPlayer = session.playerId === player.id
  const isActive = game.index === player.order
  const isCurrentPlayer = isPlayer && isActive
  const trigger = useTrigger(game.id!)
  const [takeTurn] = useMutation(takeTurnMutation)
  useEffect(() => {}, [player])

  const commitTakeTurn = async (word: string, totalElapsedTime?: number) => {
    const data = await takeTurn({
      playerId: player.id,
      gameId: game.id,
      word,
      totalElapsedTime,
    })
    if (data.score <= 0) {
      await trigger("game-finished", {})
    } else {
      await trigger("turn-taken", { word: word || "" })
    }
  }

  const submitGameWordForm = async (values) => {
    try {
      await commitTakeTurn(values.word)
    } catch (error) {
      return {
        [FORM_ERROR]: error.toString(),
      }
    }
  }

  const onTimerComplete: CountdownCircleTimerProps["onComplete"] = (totalElapsedTime) => {
    if (isCurrentPlayer) {
      commitTakeTurn("").then()
    }
    return [true, 5]
  }

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
        <Box opacity={isCurrentPlayer ? 1 : 0.6} pt={6}>
          <CountDown
            countdownKey={game.index}
            strokeWidth={2}
            isPlaying={isCurrentPlayer}
            size={75}
            duration={game.timer}
            colors={[["#308f8e", 0.33]]}
            onComplete={onTimerComplete}
          />
        </Box>
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
          <Heading pt={5} mb={-5} fontSize={"1xl"} fontWeight={200}>
            {player.lastWord}
          </Heading>
        </Stack>
      </Box>
      <Divider />
      <Box p={5}>
        <GameWordForm
          key={game.lastWord}
          lastWord={game.lastWord}
          isActivePlayer={isCurrentPlayer}
          schema={TakeTurn}
          initialValues={{ word: game.lastWord || "" }}
          onSubmit={submitGameWordForm}
        />
      </Box>
    </Box>
  )
}
