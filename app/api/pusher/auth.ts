import { BlitzApiHandler, getSession } from "blitz"

import { PresenceChannelData } from "pusher"
import { serverPusher } from "../../pusher"

const handler: BlitzApiHandler = async (req, res) => {
  const { socket_id, channel_name } = req.body
  const { gameId, playerId, playerName } = await getSession(req, res)
  const presenceData: PresenceChannelData = {
    user_id: playerId!,
    user_info: {
      gameId,
      playerName,
    },
  }

  const auth = await serverPusher.authenticate(socket_id, channel_name, presenceData)
  res.status(200).json(auth)
}

export default handler
