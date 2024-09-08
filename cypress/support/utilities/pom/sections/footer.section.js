export class Footer {
  selectors = {};

  verifyFooter() {
    cy.contains("© CEEZER 2024")
      .parent()
      .should("be.visible")
      .within(() => {
        cy.get("p")
          .eq(0)
          .should("be.visible")
          .and("have.text", "© CEEZER 2024");
        cy.get("a")
          .eq(0)
          .should("be.visible")
          .and("have.attr", "href", "/supply/company#legalConditions");
        cy.get("a")
          .eq(0)
          .find("p")
          .should("be.visible")
          .and("have.text", "Platform & Transaction agreements");
        cy.get("a")
          .eq(1)
          .should("be.visible")
          .and(
            "have.attr",
            "href",
            "https://www.ceezer.earth/platform-pages/privacy-policy"
          );
        cy.get("a")
          .eq(1)
          .find("p")
          .should("be.visible")
          .and("have.text", "Privacy Policy");
        cy.get("a")
          .eq(2)
          .should("be.visible")
          .and(
            "have.attr",
            "href",
            "https://www.ceezer.earth/platform-pages/imprint"
          );
        cy.get("a")
          .eq(2)
          .find("p")
          .should("be.visible")
          .and("have.text", "Imprint");
        cy.get("a")
          .eq(3)
          .find("p")
          .should("be.visible")
          .and("have.text", "Cookie settings");
      });
  }
}
