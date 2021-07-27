import { render } from "test/utils"
import { JoinGameForm } from "./JoinGameForm"

describe("Join Game Form Tests", () => {
  it("Submits Successfully", async () => {
    const onSubmit = jest.fn()
    const { getByRole, getByText } = render(
      <JoinGameForm submitText="Start Game" onSubmit={onSubmit} />
    )
  })
})
