describe("index page", () => {
  beforeEach(() => {
    cy.intercept("GET", "/").as("index")
  })

  it.skip("Enters in a Username and has no errors", () => {
    cy.visit("/")
    cy.wait("@index")

    cy.location("pathname").should("eq", "/")
    cy.contains("h2", "Test Your").should("exist")
    cy.get('input[name="name"]').as("usernameInput").should("exist")
    cy.get("#create-private-game-btn").as("createPrivateGameBtn").should("exist")
    cy.get("@usernameInput").should("have.value", "")

    // TODO Figure out why Cypress bugs out when trying to type into a field that exists on the DOM
    cy.get("@usernameInput").type("Mellow").should("have.value", "Mellow")
    cy.get("@createPrivateGameBtn").click()
    cy.location("pathname").should("contain", "/games/")
  })
})

export {}
