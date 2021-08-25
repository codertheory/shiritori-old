import { resolver } from "blitz"
import db from "db"
import { CreateGame } from "../validations"
import { generateRandomLetter, setSessionPublicData } from "../consts"

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
        lastWord: generateRandomLetter(),
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
