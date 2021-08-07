import { mockRouter } from "../../../test/utils"
import cuid from "cuid"

jest.mock("blitz", () => ({
  ...jest.requireActual<object>("blitz")!,
  useQuery: jest.fn(),
}))

describe("GameManager Tests", () => {
  beforeEach(async () => {
    mockRouter.params = {
      gameId: cuid(),
    }
  })

  afterEach(async () => {
    mockRouter.params = {}
  })

  it("Renders Successfully", async () => {
    // render(<GameManager/>)
  })
})
