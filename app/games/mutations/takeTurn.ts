import { Ctx, resolver } from "blitz"
import { z } from "zod"
import getGameWithPlayers from "../queries/getGameWithPlayers"
import updateGame from "./updateGame"
import updatePlayer from "../../players/mutations/updatePlayer"
import createWord from "../../words/mutations/createWord"
import { UpdateGame } from "../validations"

export const TakeTurn = z.object({
  playerId: z.string(),
  gameId: z.string(),
  word: z.string(),
  totalElapsedTime: z.number().default(1).optional(),
})

export default resolver.pipe(
  resolver.zod(TakeTurn),
  async ({ playerId, gameId, word, totalElapsedTime }, ctx: Ctx) => {
    const newWord = await createWord(
      {
        playerId,
        gameId,
        word,
        totalElapsedTime: totalElapsedTime || 1,
      },
      ctx
    )

    const game = await getGameWithPlayers(
      {
        id: gameId,
      },
      ctx
    )

    const starting = game!.index === game!.players!.length ? game!.index : game!.index + 1
    const nextIndex = starting % game!.players!.length
    const nextPlayer = game!.players[nextIndex]
    const updateGamePayload: z.infer<typeof UpdateGame> = {
      id: gameId,
      index: nextPlayer!.order,
    }
    if (word && word.length > 0) {
      updateGamePayload.lastWord = word
    }

    await updateGame(updateGamePayload, ctx)
    let updatePlayerPayload: {
      lastWord?: string
      score: {
        decrement?: number
        increment?: number
      }
    }

    if (word) {
      updatePlayerPayload = {
        lastWord: newWord.word,
        score: {
          decrement: newWord.points,
        },
      }
    } else {
      updatePlayerPayload = {
        score: {
          increment: 15,
        },
      }
    }

    return await updatePlayer(
      {
        id: playerId,
        ...updatePlayerPayload,
      },
      ctx
    )
  }
)
