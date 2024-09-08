export class Header {
  selectors = {
    logo: '[data-testid="logo-CEEZER"]',
  };

  verifyHeader() {
    cy.get(this.selectors.logo)
      .should("be.visible")
      .and("have.attr", "src", "/img/logo/logoBigDark.svg");
  }
}
