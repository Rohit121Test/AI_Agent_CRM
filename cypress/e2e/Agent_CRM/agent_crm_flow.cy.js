
import { contactCrm } from "../../support/Pages/contactCrm";
import { globalChatDetail } from "../../support/Pages/globalChatDetail";
import { manageAgent } from "../../support/Pages/manageAgent";

describe('Positive flow for creating a lead from agent and verfiying in CRM', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/v1/contacts**').as('getContacts');
    cy.intercept('POST', '**/api/leads').as('leadsFormSubmit');

    cy.clearCookies();
    cy.clearLocalStorage();
    cy.clearAllCookies();
    cy.clearAllLocalStorage();
    cy.clearAllSessionStorage();
    
    cy.login(Cypress.env("TEST_USER"), Cypress.env("TEST_PASS"));
  })

    const name = faker.person.firstName();
    const phoneNumber = faker.helpers.replaceSymbols('5##-###-####');
    const email = faker.internet.email();
    const location = "New York";

  it('should submit agent lead form and verify contact data in CRM', () => {

    // Navigating to the chat detail page
    globalChatDetail.navigateToChatDetail();

    //Navigating to manage agent page and interacting with agent chat
    manageAgent.navigatetoAgentChat();

    // Filling and submitting the lead form in chat
    manageAgent.VerifyLeadFormsInChat();
    manageAgent.FillName(name);
    manageAgent.fillEmail(email);
    manageAgent.fillPhone(phoneNumber);
    manageAgent.fillLocation(location);
    manageAgent.fillDate();
    manageAgent.submitForm();
    manageAgent.waitForLeadSubmit();

    // CRM lead verification
    contactCrm.visit();
    contactCrm.waitForContactsToLoad();
    contactCrm.verifyApiLeadCreated({ name, email, phoneNumber, location });
    contactCrm.verifyLeadUI({ name, email, phoneNumber, location });

  })
})