import { render } from "test/utils"
import userEvent from "@testing-library/user-event"
import { CreateGameForm } from "./CreateGameForm"
import { act } from "react-dom/test-utils"

describe("Create Game Form Tests", () => {
  it("Submits Successfully", async () => {
    const onSubmit = jest.fn()
    const { getByPlaceholderText, getByText } = render(<CreateGameForm onSubmit={onSubmit} />)
    const userNameInput = getByPlaceholderText("Some Wacky Username") as HTMLInputElement
    expect(userNameInput).toBeInTheDocument()

    expect(userNameInput.value).toBe("")
    await act(() => {
      userEvent.type(userNameInput, "Mellow")
    })
    expect(userNameInput.value).toBe("Mellow")

    const createPrivateGameBtn = getByText("Create Private Game")
    expect(createPrivateGameBtn).toBeInTheDocument()

    await act(() => {
      userEvent.click(createPrivateGameBtn)
    })
    expect(onSubmit).toBeCalledWith({ name: "Mellow", private: true })
  })
})
