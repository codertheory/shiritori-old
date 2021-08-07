import PlayerLobbyCard from "./PlayerLobbyCard"
import { render, screen } from "../../../test/utils"
import { playerFactory } from "../../../test/factories"

describe("Player Lobby Card Tests", () => {
  let player = playerFactory.build({})

  it("Renders Successfully", async () => {
    render(<PlayerLobbyCard player={player} />)
    expect(screen.getByText(player.name)).toBeInTheDocument()
  })
})
