import { Ctx, resolver } from "blitz"
import db from "db"
import { CreateGame } from "../validations"
import { setSessionPublicData } from "../consts"
import createPlayer from "../../players/mutations/createPlayer"

export default resolver.pipe(
  resolver.zod(CreateGame),
  async ({ name, ...input }, ctx: Ctx) => {
    const game = await db.game.findFirst({
      where: {
        started: false,
        private: false,
      },
    })

    if (game) {
      await createPlayer(
        {
          name,
          gameId: game.id,
        },
        ctx
      )
    } else {
    }

    return game
  },
  setSessionPublicData
)
