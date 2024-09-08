/// <reference types="cypress" />

import { SignupPage } from "../support/utilities/pom/pages/signup.page";
import { Header } from "../support/utilities/pom/sections/header.section";
import { Footer } from "../support/utilities/pom/sections/footer.section";

const signupPage = new SignupPage();
const header = new Header();
const footer = new Footer();

describe("Sign Up Process", () => {
  beforeEach(() => {
    cy.visit("/sign-up/create");
    cy.location("pathname").should("eq", "/sign-up/create");
  });

  context("Successful Sign Up", () => {
    it("should complete sign up as a buyer", () => {
      cy.fixture("signup").then((data) => {
        header.verifyHeader();
        signupPage.verifyFirstPageUI();
        signupPage.verifyCreatePageTitle(0, data.firstPageTitle);
        signupPage.verifyCreatePageTitle(1, data.firstPageLabel);
        footer.verifyFooter();

        // Choose the buyer option and verify title is updated
        cy.get(signupPage.selectors.buyer).should("be.visible").click();
        signupPage.verifyCreatePageTitle(1, data.firstPageLabelForBuyer);

        signupPage.fillFirstForm(
          `Company ${Date.now()}`,
          `email${Date.now()}@example.com`,
          "First Name",
          "Last Name"
        );

        cy.get(signupPage.selectors.submitButton).should("be.visible").click();
        cy.location("pathname").should("eq", "/sign-up/create");

        header.verifyHeader();
        signupPage.verifySecondPageUIAsBuyer();
        signupPage.verifyCreatePageTitle(0, data.secondPageTitle);
        signupPage.verifyCreatePageTitle(1, data.firstPageLabelForBuyer);
        footer.verifyFooter();

        signupPage.fillSecondForm(
          "123456789", // Registration number
          "987654321", // VAT number
          "1234 Address", // Company address
          "City", // City name
          "12345", // Postal/ZIP code
          "Germany", // Country
          "Aero", // Industry
          null // No company description
        );

        cy.get(signupPage.selectors.createAccountButton)
          .should("be.visible")
          .click();
        signupPage.verifySuccessSignUpPage();
        header.verifyHeader();
        footer.verifyFooter();
      });
    });

    it("should complete sign up as a supplier", () => {
      cy.fixture("signup").then((data) => {
        header.verifyHeader();
        signupPage.verifyFirstPageUI();
        signupPage.verifyCreatePageTitle(0, data.firstPageTitle);
        signupPage.verifyCreatePageTitle(1, data.firstPageLabel);
        footer.verifyFooter();

        cy.get(signupPage.selectors.supplier).should("be.visible").click();
        signupPage.verifyCreatePageTitle(1, data.firstPageLabelForSupplier);

        signupPage.fillFirstForm(
          `Company ${Date.now()}`,
          `email${Date.now()}@example.com`,
          "First Name",
          "Last Name"
        );

        cy.get(signupPage.selectors.submitButton).should("be.visible").click();
        cy.location("pathname").should("eq", "/sign-up/create");

        header.verifyHeader();
        signupPage.verifySecondPageUIAsSupplier();
        signupPage.verifyCreatePageTitle(0, data.secondPageTitle);
        signupPage.verifyCreatePageTitle(1, data.firstPageLabelForSupplier);
        footer.verifyFooter();

        signupPage.fillSecondForm(
          null, // No registration number
          "987654321", // VAT number
          "1234 Address", // Company address
          "City", // City name
          "12345", // Postal/ZIP code
          "Germany", // Country
          null, // No industry
          "Description" // Company description
        );

        cy.get(signupPage.selectors.createAccountButton)
          .should("be.visible")
          .click();
        cy.location("pathname").should("eq", "/sign-up/create");
        signupPage.verifySuccessSignUpPage();
        header.verifyHeader();
        footer.verifyFooter();
      });
    });
  });

  context("Validation Errors", () => {
    it("should not proceed with empty fields", () => {
      cy.fixture("signup").then((data) => {
        cy.get(signupPage.selectors.submitButton).should("be.visible").click();
        signupPage.verifyErrorMessagesWithFirstForm();

        cy.get(signupPage.selectors.buyer).should("be.visible").click();
        signupPage.fillFirstForm(
          `Company ${Date.now()}`,
          `email${Date.now()}@example.com`,
          "First Name",
          "Last Name"
        );

        cy.get(signupPage.selectors.submitButton).should("be.visible").click();
        signupPage.verifyCreatePageTitle(0, data.secondPageTitle);
        cy.get(signupPage.selectors.createAccountButton)
          .should("be.visible")
          .click();

        signupPage.verifyErrorMessagesWithSecondForm();

        // User able to create account with valid data after all fields are filled
        signupPage.fillSecondForm(
          "123456789", // Registration number
          null, // No VAT number provided
          "1234 Address", // Company address
          "City", // City name
          "12345", // Postal/ZIP code
          "Germany", // Country
          "Aero" // Industry
        );
        cy.get(signupPage.selectors.createAccountButton)
          .should("be.visible")
          .click();
        signupPage.verifySuccessSignUpPage();
        header.verifyHeader();
        footer.verifyFooter();
      });
    });
  });
});
