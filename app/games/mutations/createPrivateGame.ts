import { Ctx, resolver } from "blitz"
import db from "db"
import { CreateGame } from "../validations"
import { alphabet, setSessionPublicData } from "../consts"

export default resolver.pipe(
  resolver.zod(CreateGame),
  async ({ name, ...input }) => {
    return await db.game.create({
      data: {
        players: {
          create: [
            {
              name,
            },
          ],
        },
        lastWord: alphabet[Math.floor(Math.random() * alphabet.length)],
        ...input,
      },
      include: {
        players: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })
  },
  setSessionPublicData
)
