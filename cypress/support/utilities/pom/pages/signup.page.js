export class SignupPage {
  // Selectors
  selectors = {
    buyer: '[data-testid="select-buyer-button"]',
    supplier: '[data-testid="select-supplier-button"]',
    formTitle: "h2.chakra-heading",
    companyNameInput: '[data-testid="company-name-input"]',
    emailInput: '[data-testid="email-input"]',
    firstNameInput: '[data-testid="first-name-input"]',
    lastNameInput: '[data-testid="last-name-input"]',
    submitButton: '[data-testid="signup-button"]',
    createAccountButton: '[data-testid="create-account-button"]',
    registrationNumberInput: '[data-testid="registration-number-input"]',
    vatNumberInput: '[data-testid="vat-number-input"]',
    addressInput: '[data-testid="address-input"]',
    cityInput: '[data-testid="city-input"]',
    zipInput: '[data-testid="zip-input"]',
    countryInput: '[data-testid="country-select"]',
    industryInput: '[data-testid="industry-select"]',
    descriptionInput: '[data-testid="description-textarea"]',
    arrowBackButton: '[data-testid="arrow-back-button"]',
  };

  /**
   * Verifies the text of a specific form title on a page based on its index.
   *
   * @param {number} index - The zero-based index of the form title to be verified.
   * @param {string} text - The expected text of the form title.
   */
  verifyCreatePageTitle(index, text) {
    cy.get(this.selectors.formTitle).eq(index).should("have.text", text);
  }

  /**
   * Fills out the first form with personal details.
   *
   * @param {string} name - The company name.
   * @param {string} email - The contact email.
   * @param {string} firstName - The user's first name.
   * @param {string} lastName - The user's last name.
   */
  fillFirstForm(name, email, firstName, lastName) {
    cy.get(this.selectors.companyNameInput)
      .should("be.visible")
      .and("be.empty")
      .type(name);
    cy.get(this.selectors.companyNameInput).should("have.value", name);

    cy.get(this.selectors.emailInput)
      .should("be.visible")
      .and("be.empty")
      .type(email);
    cy.get(this.selectors.emailInput).should("have.value", email);

    cy.get(this.selectors.firstNameInput)
      .should("be.visible")
      .and("be.empty")
      .type(firstName);
    cy.get(this.selectors.firstNameInput).should("have.value", firstName);

    cy.get(this.selectors.lastNameInput)
      .should("be.visible")
      .and("be.empty")
      .type(lastName);
    cy.get(this.selectors.lastNameInput).should("have.value", lastName);
  }

  /**
   * Fills out the second form with detailed company information such as registration number,
   * VAT number, address, city, zip code, country, and industry. This method also verifies
   * that each input is initially empty and contains the expected value after typing/selecting.
   *
   * @param {string} number - The company's registration number (optional).
   * @param {string} vat - The company's VAT number (optional).
   * @param {string} address - The company's address.
   * @param {string} city - The city where the company is located.
   * @param {string} zip - The ZIP code of the company's location.
   * @param {string} country - The country where the company is located.
   * @param {string} industry - The industry sector of the company (optional).
   * @param {string} description - The company's description (optional).
   */
  fillSecondForm(
    number,
    vat,
    address,
    city,
    zip,
    country,
    industry,
    description
  ) {
    // Only type the registration number if it is provided
    if (number) {
      cy.get(this.selectors.registrationNumberInput)
        .should("be.empty")
        .type(number)
        .should("have.value", number);
    }
    // Only type the VAT number if it is provided
    if (vat) {
      cy.get(this.selectors.vatNumberInput)
        .should("be.empty")
        .type(vat)
        .should("have.value", vat);
    }
    cy.get(this.selectors.addressInput)
      .should("be.empty")
      .type(address)
      .should("have.value", address);
    cy.get(this.selectors.cityInput)
      .should("be.empty")
      .type(city)
      .should("have.value", city);
    cy.get(this.selectors.zipInput)
      .should("be.empty")
      .type(zip)
      .should("have.value", zip);
    cy.get(this.selectors.countryInput).click().type(`${country}{enter}`);
    // Only select the industry if it is provided
    if (industry) {
      cy.get(this.selectors.industryInput).click().type(`${industry}{enter}`);
    }
    if (description) {
      cy.get(this.selectors.descriptionInput)
        .should("be.empty")
        .type(description)
        .should("have.value", description);
    }
  }

  /**
   * Verifies the visibility, text content, and text color of error messages for various inputs
   * on the first form of the signup page. This method checks error messages for the account type,
   * company name, email address, first name, and last name inputs to ensure they meet the specified
   * validation criteria.
   */
  verifyErrorMessagesWithFirstForm() {
    const errorMessage = "Please enter your ";
    const errorColor = "rgb(229, 62, 62)";

    cy.get(this.selectors.buyer)
      .parent()
      .next()
      .should("be.visible")
      .and("have.text", "Please select account type")
      .and("have.css", "color", errorColor);

    cy.get(this.selectors.companyNameInput)
      .parent()
      .parent()
      .next()
      .should("be.visible")
      .and("have.text", `${errorMessage}company name`)
      .and("have.css", "color", errorColor);

    cy.get(this.selectors.emailInput)
      .parent()
      .parent()
      .next()
      .should("be.visible")
      .and("have.text", `${errorMessage}email address`)
      .and("have.css", "color", errorColor);

    cy.get(this.selectors.firstNameInput)
      .parent()
      .parent()
      .next()
      .should("be.visible")
      .and("have.text", `${errorMessage}first name`)
      .and("have.css", "color", errorColor);

    cy.get(this.selectors.lastNameInput)
      .parent()
      .parent()
      .next()
      .should("be.visible")
      .and("have.text", `${errorMessage}last name`)
      .and("have.css", "color", errorColor);
  }

  /**
   * Verifies the visibility, text content, and text color of error messages for various inputs
   * on the second form of the registration page. Checks are made for inputs such as the
   * registration number, company address, city, postal code, country, and industry, ensuring
   * each message is correctly displayed and styled.
   */
  verifyErrorMessagesWithSecondForm() {
    const errorColor = "rgb(229, 62, 62)";

    cy.get(this.selectors.registrationNumberInput)
      .parent()
      .parent()
      .next()
      .should("be.visible")
      .and("have.text", "Please enter registration number")
      .and("have.css", "color", errorColor);

    cy.get(this.selectors.addressInput)
      .parent()
      .parent()
      .next()
      .should("be.visible")
      .and("have.text", "Enter company address and number")
      .and("have.css", "color", errorColor);

    cy.get(this.selectors.cityInput)
      .parent()
      .parent()
      .next()
      .should("be.visible")
      .and("have.text", "Please enter city")
      .and("have.css", "color", errorColor);

    cy.get(this.selectors.zipInput)
      .parent()
      .parent()
      .next()
      .should("be.visible")
      .and("have.text", "Please enter postal code")
      .and("have.css", "color", errorColor);

    cy.get(this.selectors.countryInput)
      .parent()
      .next()
      .should("be.visible")
      .and("have.text", "Please select country")
      .and("have.css", "color", errorColor);

    cy.get(this.selectors.industryInput)
      .parent()
      .next()
      .should("be.visible")
      .and("have.text", "Please select industry")
      .and("have.css", "color", errorColor);
  }

  /**
   * Verifies the user interface elements on the first page of the signup process, ensuring all inputs,
   * labels, buttons, and links are visible and correctly labeled according to the specifications.
   */
  verifyFirstPageUI() {
    // Verify the main form question
    cy.get("form")
      .find("p")
      .eq(0)
      .should("be.visible")
      .and("have.text", "Are you looking to buy or sell carbon credits?");

    // Check visibility and label for 'Buyer' option
    cy.get(this.selectors.buyer)
      .should("be.visible")
      .find("svg")
      .should("be.visible");
    cy.get(this.selectors.buyer)
      .find("p")
      .should("be.visible")
      .and("have.text", "Buyer");

    // Check visibility and label for 'Project developer' option
    cy.get(this.selectors.supplier)
      .should("be.visible")
      .find("svg")
      .should("be.visible");
    cy.get(this.selectors.supplier)
      .find("p")
      .should("be.visible")
      .and("have.text", "Project developer");

    // Verify input fields with placeholder and label verification
    const inputDetails = [
      {
        selector: this.selectors.companyNameInput,
        placeholder: "Enter company name",
        label: "Company name",
      },
      {
        selector: this.selectors.emailInput,
        placeholder: "Enter company email address",
        label: "Email address",
      },
      {
        selector: this.selectors.firstNameInput,
        placeholder: "Enter first name",
        label: "First name",
      },
      {
        selector: this.selectors.lastNameInput,
        placeholder: "Enter last name",
        label: "Last name",
      },
    ];

    inputDetails.forEach((input) => {
      cy.get(input.selector)
        .should("be.visible")
        .and("have.attr", "placeholder", input.placeholder)
        .parent()
        .parent()
        .parent()
        .prev()
        .should("be.visible")
        .and("have.text", input.label);
    });

    // Verify the presence of the sign-up button and related navigation links
    cy.get(this.selectors.submitButton)
      .should("be.visible")
      .and("have.text", "Sign up");
    cy.get(this.selectors.submitButton)
      .next()
      .should("be.visible")
      .and("have.text", "Already have an account? Log in");
    cy.get(this.selectors.submitButton)
      .parent()
      .find("a")
      .should("have.attr", "href", "/sign-in");
  }

  /**
   * Verifies the UI elements on the second page of the buyer signup flow.
   * Ensures that all input fields, labels, and buttons are visible and correctly labeled or contain
   * the appropriate placeholder text. Also checks for specific styling attributes where applicable.
   */
  verifySecondPageUIAsBuyer() {
    // Check form title visibility and text content
    cy.get(this.selectors.formTitle)
      .eq(0)
      .next()
      .should("be.visible")
      .and("include.text", "Provide the information for your");

    // Verify each input field with its corresponding label
    const inputDetails = [
      {
        selector: this.selectors.registrationNumberInput,
        placeholder: "Enter registration number",
        label: "Registration number",
      },
      {
        selector: this.selectors.vatNumberInput,
        placeholder: "Enter VAT ID",
        label: "VAT ID",
      },
      {
        selector: this.selectors.addressInput,
        placeholder: "Enter address",
        label: "Street address (and number)",
      },
      {
        selector: this.selectors.cityInput,
        placeholder: "Enter city",
        label: "City",
      },
      {
        selector: this.selectors.zipInput,
        placeholder: "Enter postal code",
        label: "Postal code",
      },
      {
        selector: this.selectors.countryInput,
        selectLabel: "Select country",
        label: "Country",
      },
      {
        selector: this.selectors.industryInput,
        selectLabel: "Select industry",
        label: "Industry",
      },
    ];

    inputDetails.forEach((input) => {
      if (input.placeholder) {
        cy.get(input.selector)
          .should("be.visible")
          .and("have.attr", "placeholder", input.placeholder)
          .parent()
          .parent()
          .parent()
          .prev()
          .should("be.visible")
          .and("have.text", input.label);
      } else if (input.selectLabel) {
        cy.get(input.selector).should("be.visible").contains(input.selectLabel);
        cy.get(input.selector)
          .parent()
          .parent()
          .prev()
          .should("be.visible")
          .and("have.text", input.label);
      }
    });

    // Verify buttons and additional elements
    cy.get(this.selectors.createAccountButton)
      .should("be.visible")
      .and("have.text", "Create account")
      .and("have.css", "background-color", "rgb(45, 55, 72)");

    cy.get(this.selectors.arrowBackButton)
      .should("be.visible")
      .find("svg")
      .and("be.visible");
  }

  /**
   * Verifies the UI elements on the second page of the supplier signup flow.
   * Ensures that all input fields, labels, and buttons are visible and correctly labeled or contain
   * the appropriate placeholder text. Also checks for specific styling attributes where applicable.
   */
  verifySecondPageUIAsSupplier() {
    // Check form title visibility and text content
    cy.get(this.selectors.formTitle)
      .eq(0)
      .next()
      .should("be.visible")
      .and("include.text", "Provide the information for your");

    // Verify each input field with its corresponding label
    const inputDetails = [
      {
        selector: this.selectors.vatNumberInput,
        placeholder: "Enter VAT ID",
        label: "VAT ID",
      },
      {
        selector: this.selectors.addressInput,
        placeholder: "Enter address",
        label: "Street address (and number)",
      },
      {
        selector: this.selectors.cityInput,
        placeholder: "Enter city",
        label: "City",
      },
      {
        selector: this.selectors.zipInput,
        placeholder: "Enter postal code",
        label: "Postal code",
      },
      {
        selector: this.selectors.countryInput,
        selectLabel: "Select country",
        label: "Country",
      },
    ];

    inputDetails.forEach((input) => {
      if (input.placeholder) {
        cy.get(input.selector)
          .should("be.visible")
          .and("have.attr", "placeholder", input.placeholder)
          .parent()
          .parent()
          .parent()
          .prev()
          .should("be.visible")
          .and("have.text", input.label);
      } else if (input.selectLabel) {
        cy.get(input.selector).should("be.visible").contains(input.selectLabel);
        cy.get(input.selector)
          .parent()
          .parent()
          .prev()
          .should("be.visible")
          .and("have.text", input.label);
      }
    });

    cy.get(this.selectors.descriptionInput)
      .should("be.visible")
      .and("have.attr", "placeholder", "Enter company description")
      .parent()
      .parent()
      .prev()
      .should("be.visible")
      .and("have.text", "Description");

    // Verify buttons and additional elements
    cy.get(this.selectors.createAccountButton)
      .should("be.visible")
      .and("have.text", "Create account")
      .and("have.css", "background-color", "rgb(45, 55, 72)");

    cy.get(this.selectors.arrowBackButton)
      .should("be.visible")
      .find("svg")
      .and("be.visible");
  }

  verifySuccessSignUpPage() {
    cy.contains("Thanks for signing up to CEEZER.").should("be.visible");
    cy.contains(
      "We are reviewing your company information and will get back to you shortly with an invitation to access the platform."
    ).should("be.visible");
  }
}
