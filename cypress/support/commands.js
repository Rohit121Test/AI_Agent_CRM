// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
Cypress.Commands.add('login', (username, password) => {
    // Defining the intercepts
    cy.intercept('GET', '**/auth/v1/user').as('userProfile');
    
    // Performing the login steps
    cy.visit('/login',{failOnStatusCode: false});
    cy.get('input[placeholder="Email"]').type(username);
    cy.get('input[placeholder="Password"]').type(password);
    cy.get('input[placeholder="Email"]').should('have.value', username);
    cy.get('input[placeholder="Password"]').should('have.value', password);
    cy.get('button[type="submit"]').should('be.enabled').click();

    // Waiting for the user profile to complete
    cy.wait('@userProfile').its('response.statusCode').should('eq', 200);

    // Asseting successful login by checking URL
    cy.url().should('include', '/myday');
    cy.wait(3000);

});