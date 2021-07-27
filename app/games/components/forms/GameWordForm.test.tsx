import { render } from "test/utils"
import { GameWordForm } from "./GameWordForm"

describe("Game word Form Tests", () => {
  it("Submits Successfully", async () => {
    const onSubmit = jest.fn()
    const { getByRole, getByText } = render(
      <GameWordForm isActivePlayer submitText="Start Game" onSubmit={onSubmit} />
    )
  })
})
