# Sign Up Process Testing

## Approach

### Testing Strategy:

- **Positive Test Cases**: Tests that validate the expected functionality when valid inputs are provided.
- **Negative Test Cases**: These cases check how the system reacts to invalid or unexpected inputs, such as empty fields.

### Key Scenarios Covered:

1. **Successful Sign-Up** with buyer as a user.
2. **Successful Sign-Up** with supplier as a user.
3. **Validation Errors** with empty fields.

## How to Run the Tests

### Prerequisites:

- **Node.js** and **npm** should be installed on your system.
- Install Cypress and other required dependencies by running: npm install
- To open the **Cypress test runner** and **manually** observe the tests in action, run: npx cypress open
- To run the tests in headless mode, execute: npx cypress run
