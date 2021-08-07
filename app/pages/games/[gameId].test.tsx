import { render } from "../../../test/utils"
import cuid from "cuid"
import { GameManager } from "./[gameId]"

describe("GameManager Tests", () => {
  // TODO Cannot test components that use useQuery until https://github.com/blitz-js/blitz/issues/2569 is fixed
  it.skip("Renders Successfully", async () => {
    render(<GameManager gameId={cuid()} />)
  })
})
