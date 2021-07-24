import { Ctx } from "blitz"
import { Game } from "db"

export const alphabet = "abcdefghijklmnopqrstuvwxyz"

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
