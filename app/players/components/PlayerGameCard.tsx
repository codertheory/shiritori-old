import { Game, Player } from "db"
import React, { useEffect } from "react"
import { Box, Divider, Flex, Heading, Stack, useColorModeValue } from "@chakra-ui/react"
import { CountDown } from "../../games/components/CountDown"
import { FORM_ERROR, GameWordForm } from "../../games/components/forms/GameWordForm"
import { TakeTurn } from "../../games/validations"
import { useTrigger } from "@harelpls/use-pusher"
import { useMutation, useSession } from "blitz"
import createWord from "../../words/mutations/createWord"
import AnimatedNumber from "animated-number-react"
import { CountdownCircleTimerProps } from "react-countdown-circle-timer"

const PlayerScore = ({ score }: { score: number }) => {
  const formatValue = (value) => value.toFixed(2)

  return <AnimatedNumber value={score} formatValue={formatValue} />
}

export const PlayerGameCard = ({ player, game }: { player: Player; game: Game }) => {
  const session = useSession()
  const isPlayer = session.playerId === player.id
  const isActive = game.index === player.order
  const isCurrentPlayer = isPlayer && isActive
  const trigger = useTrigger(game.id!)
  const [createWordMutation] = useMutation(createWord)
  useEffect(() => {}, [player])

  const submitGameWordForm = async (values) => {
    try {
      const word = await createWordMutation({
        playerId: player.id,
        gameId: game.id,
        word: values.word,
      })
      await trigger("turn-taken", { word })
    } catch (error) {
      return {
        [FORM_ERROR]: error.toString(),
      }
    }
  }

  const onTimerComplete: CountdownCircleTimerProps["onComplete"] = (totalElapsedTime) => {
    if (isCurrentPlayer) {
      createWordMutation({
        playerId: player.id,
        gameId: game.id,
        word: "",
      }).then((r) => {
        trigger("turn-taken", {}).then()
      })
    }
    return [true, game.timer]
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
        <Box visibility={!isCurrentPlayer ? "hidden" : undefined} pt={6}>
          <CountDown
            countdownKey={player.id}
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
          <Heading pt={5} mb={-5} fontSize={"1xl"} fontWeight={200} fontFamily={"subtitle"}>
            {player.lastWord}
          </Heading>
        </Stack>
      </Box>
      <Divider />
      <Box p={5}>
        <GameWordForm
          isActivePlayer={isCurrentPlayer}
          schema={TakeTurn}
          initialValues={{ word: game.lastWord || "" }}
          onSubmit={submitGameWordForm}
        />
      </Box>
    </Box>
  )
}
