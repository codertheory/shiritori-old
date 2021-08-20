import { render, screen } from "test/utils"
import { GameSettingsForm } from "./GameSettingsForm"
import { fireEvent, waitFor } from "@testing-library/dom"

describe("Game Settings Form Tests", () => {
  it("Submits Successfully", async () => {
    const onSubmit = jest.fn()
    render(<GameSettingsForm submitText="Start Game" onSubmit={onSubmit} />)
    const timerInput = screen.getByRole("spinbutton") as HTMLInputElement
    expect(timerInput).toBeInTheDocument()
    expect(timerInput.value).toEqual("15")

    fireEvent.change(timerInput, {
      target: {
        value: 25,
      },
    })

    await waitFor(() => {
      expect(timerInput.value).toEqual("25")
    })

    const startGameBtn = screen.getByText("Start Game")

    expect(startGameBtn).toBeInTheDocument()

    fireEvent.submit(startGameBtn)

    await waitFor(() => {
      expect(onSubmit).toBeCalledWith({ timer: 25 })
    })
  })
})
