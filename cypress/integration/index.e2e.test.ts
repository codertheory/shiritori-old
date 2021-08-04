describe("index page", () => {
  beforeEach(() => {
    cy.intercept("GET", "/").as("index")
  })

  // CYPRESS IS FUCKING RETARDED and decides to arbitrarily work and not work
  it.skip("Enters in a Username and has no errors", () => {
    cy.visit("/")
    cy.wait("@index")

    cy.location("pathname").should("eq", "/")
    cy.contains("h2", "Test Your").should("exist")
    cy.get('input[name="name"]').as("usernameInput")

    cy.get("@usernameInput").should("have.value", "")

    cy.get("@usernameInput").type("Mellow").should("have.value", "Mellow")

    cy.get("#create-private-game-btn").click()
    cy.location("pathname").should("contain", "/games/")
  })
})

export {}
