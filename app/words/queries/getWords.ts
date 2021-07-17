import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetWordsInput
  extends Pick<Prisma.WordFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetWordsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: words,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.word.count({ where }),
      query: (paginateArgs) => db.word.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      words,
      nextPage,
      hasMore,
      count,
    }
  }
)
