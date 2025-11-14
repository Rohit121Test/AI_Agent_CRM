const { manageAgent } = require("../../support/Pages/manageAgent");
const { globalChatDetail } = require("../../support/Pages/globalChatDetail");
describe("Agent Form Validations",()=>{
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
    it('Validate mandatory fields in lead form',()=>{

           // Navigating to the chat detail page
            globalChatDetail.navigateToChatDetail();
        
            //Navigating to manage agent page and interacting with agent chat
            manageAgent.navigatetoAgentChat();
        
            manageAgent.VerifyLeadFormsInChat();
            manageAgent.submitForm();

            // This ensures that no API call was made for lead submission
            cy.get('@leadsFormSubmit.all').should('have.length', 0);


           //Verifying the required field errors    
            manageAgent.verifyFieldError("Full Name","required");
            manageAgent.verifyFieldError("Email","required");
            manageAgent.verifyFieldError("Phone Number","required");
            manageAgent.verifyFieldError("Where do you live?","required");
            manageAgent.verifyFieldError("Date of birth","none");
    })

    it('Validate correct message for invalid Field values',()=>{
        // Navigating to the chat detail page
            globalChatDetail.navigateToChatDetail();
        
            //Navigating to manage agent page and interacting with agent chat
            manageAgent.navigatetoAgentChat();
        
            // Filling and submitting the lead form in chat
            manageAgent.VerifyLeadFormsInChat();
            manageAgent.fillEmail("abdsd");
            manageAgent.submitForm();
            // Vaalidating invalid email error

            manageAgent.verifyFieldError("Email","invalidEmail");

            // Validating invalid phone number error
            manageAgent.fillPhone("1222");
            manageAgent.submitForm();
            manageAgent.verifyFieldError("Phone Number","invalidPhone");

    })   

})