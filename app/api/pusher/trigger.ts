import { BlitzApiHandler } from "blitz"
import { serverPusher } from "../../pusher"

const handler: BlitzApiHandler = async (req, res) => {
  const { channelName, eventName, data } = JSON.parse(req.body)

  const response = await serverPusher.trigger(channelName, eventName, data)
  res.status(200).json(response)
}

export default handler
