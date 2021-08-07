import { PlayerGameCard } from "./PlayerGameCard"
import { render, screen } from "../../../test/utils"
import { gameFactory, playerFactory } from "../../../test/factories"

describe("Player Game Card Tests", () => {
  let game = gameFactory.build()
  let player = playerFactory.build({
    gameId: game.id,
  })

  it("Renders Successfully", async () => {
    render(<PlayerGameCard game={game} player={player} />)
    expect(screen.getByText(player.name)).toBeInTheDocument()
    // TODO figure out how to deal with animations
    // expect(screen.getByText(player.score)).toBeInTheDocument()
    expect(screen.getByText(player.lastWord!)).toBeInTheDocument()
  })
})
