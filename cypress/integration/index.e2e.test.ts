describe("index page", () => {
  beforeEach(() => {
    cy.visit("/")
  })

  it("Goes to the Create Game Page", () => {
    cy.contains("h2", "Create Game")
  })
})

export {}
