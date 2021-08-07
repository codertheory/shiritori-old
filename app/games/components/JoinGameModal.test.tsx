import { render, screen } from "../../../test/utils"
import { JoinGameModal } from "./JoinGameModal"

describe("Join Game Modal Tests", () => {
  it("Renders Successfully", async () => {
    render(<JoinGameModal />)
    expect(screen.getByText("Join Game")).toBeInTheDocument()
    expect(screen.getByText("Join")).toBeInTheDocument()
  })
})
