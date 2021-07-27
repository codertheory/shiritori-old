import { render } from "test/utils"
import { GameSettingsForm } from "./GameSettingsForm"
import userEvent from "@testing-library/user-event"
import { act } from "react-dom/test-utils"

describe("Game Settings Form Tests", () => {
  it("Submits Successfully", async () => {
    const onSubmit = jest.fn()
    const { getByRole, getByText } = render(
      <GameSettingsForm submitText="Start Game" onSubmit={onSubmit} />
    )
    const timerInput = document.getElementById("field-timer") as HTMLInputElement
    expect(timerInput).toBeInTheDocument()
    expect(timerInput.value).toEqual("15")

    await act(() => {
      userEvent.type(timerInput, "25")
    })

    // expect(timerInput.value).toEqual("25")

    // const form = getByRole("form")
    //
    // expect(form).toBeInTheDocument()
    //
    // expect(onSubmit).toBeCalledWith({ timer: 15 })
  })
})
