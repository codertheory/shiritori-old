import { render } from "test/utils"

import Home from "./index"

describe("Create Game Page Tests", () => {
  it("Renders Form successfully", async () => {
    const { getByText } = render(<Home />)
    const text = getByText("With your Friends!")
    expect(text).toBeInTheDocument()
  })
})
