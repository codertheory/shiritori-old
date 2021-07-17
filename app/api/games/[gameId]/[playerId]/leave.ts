import { BlitzApiHandler, getSession } from "blitz"
import db from "db"
import { serverPusher } from "../../../pusher/trigger"

export const handler: BlitzApiHandler = async (req, res) => {
  const { query } = req
  const { gameId, playerId } = await getSession(req, res)
  if (query.gameId === gameId && query.playerId === playerId) {
    await db.player.delete({
      where: { id: playerId },
    })
    await serverPusher.trigger(gameId!, "player-deleted", { playerId })
    const game = await db.game.findUnique({
      where: { id: gameId },
      select: {
        _count: {
          select: {
            players: true,
          },
        },
      },
    })
    if (game) {
      if (game._count?.players) {
        if (game._count.players === 0) {
          await db.game.delete({
            where: { id: gameId },
          })
        }
      }
    }
    res.status(200).end()
  } else {
    res.status(403).end()
  }
}

export default handler
