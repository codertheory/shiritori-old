import { Ctx } from "blitz"
import { Game, GameVariant } from "db"
import { z } from "zod"

export const alphabet = "abcdefghijklmnopqrstuvwxyz"
export const generateRandomLetter = () => {
  return alphabet[Math.floor(Math.random() * alphabet.length)]
}

type gameWithPlayers = Game & {
  players: {
    id: string
    name: string
  }[]
}

export const setSessionPublicData = async (game: gameWithPlayers, ctx: Ctx) => {
  await ctx.session.$setPublicData({
    playerId: game.players[0]!.id,
    playerName: game.players[0]!.name,
    gameId: game.id,
    role: "HOST",
  })
  return game
}

export const GameVariantsEnum = z.nativeEnum(GameVariant)
