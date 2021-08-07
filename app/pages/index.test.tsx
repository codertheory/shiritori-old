import { render } from "test/utils"

import Home from "./index"

describe("HomePage Tests", () => {
  it("Renders successfully", async () => {
    const { getByText, getByPlaceholderText } = render(<Home />)
    expect(getByText("With your Friends!")).toBeInTheDocument()
    expect(getByPlaceholderText("Some Wacky Username")).toBeInTheDocument()
  })
})
