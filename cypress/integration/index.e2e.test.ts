describe("index page", () => {
  beforeEach(() => {
    cy.visit("/")
  })

  it("Enters in a Username and Clicks Create Private Game", () => {
    cy.wait(2000)
    cy.location("pathname").should("eq", "/")
    cy.contains("h2", "Test Your").should("exist")
    const usernameInput = cy.get("input")
    usernameInput.type("Mellow")
    usernameInput.should("have.value", "Mellow")
    cy.get("#create-private-game-btn").click()
    cy.location("pathname").should("contain", "/games/")
  })
})

export {}
