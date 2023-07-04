describe("Closet View", () => {
  beforeEach(() => {
    cy.intercept("GET", "https://closet-manager-be.herokuapp.com/api/v1/users/1/items/find_all?", {fixture: "closet"})
    cy.intercept("GET", "https://closet-manager-be.herokuapp.com/api/v1/users/1/items", {fixture: "closet"})
    cy.visit("http://localhost:5173/");
  })
  it("Should be able to navigate to the closet from the landing page", () => {
    cy.get('.home-container > [href="/myCloset"]').click();
    cy.on("url:changed", (newUrl) => {
      expect(newUrl).to.contain("/myCloset");
    });
  });
  it("Should contain cards of images", () => {
    cy.get('.home-container > [href="/myCloset"]').click();
    cy.get(".cards-container").should("be.visible");
  });
  it("Should inform the user if a server error occurs", () => {
    cy.intercept("GET", "https://closet-manager-be.herokuapp.com/api/v1/users/1/items", {
      statusCode: 500,
    })
    cy.intercept("GET", "https://closet-manager-be.herokuapp.com/api/v1/users/1/items/find_all?", {
      statusCode: 500,
    })
    cy.get('.home-container > [href="/myCloset"]').click();
    cy.get("p[class='fetch-error-text']").should("contain", "Unable to get items. Please try again later.")
  });
});