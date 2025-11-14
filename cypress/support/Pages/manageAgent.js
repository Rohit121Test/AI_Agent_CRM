class ManageAgent{
    selectors = {
      chatBotHeader:"Manage Agents",
      date: "2025-05-24",
      OpenAgentChat:"Start Chat",
      agent1name:"Abc",
      leadFormHeader:"Please complete this form",
      Namelabel:"Full Name",
      serviceLabel:"What service do you need?",
      locationlabel:"Where do you live?",
      emailselector:"input[type='email']",
      phoneSelector:"input[type='tel']",
      dateselector:"input[type='date']",
      missingValueError:"This field is required",
      invalidEmailError:"Please enter a valid email address",
      invalidPhoneError:"Please enter a valid phone number"


    }
    validateTokenLimit(){
   // ***This fucntion checks if chat tokens are exhausted and skips the test if they are
        cy.contains(/chats used$/)
          .invoke('text')
          .then((text) => {
                const [used, total] = text.match(/\d+/g).map(Number);

            if (used >= total) {
            Cypress.config('isInteractive')   // show skip message only in GUI
             ? cy.log("⚠️ Chat tokens exhausted. Skipping test.")
             : null;
        
        cy.skip(); 
    }
  });

    }
    navigateToAgentPage(){
        cy.get("h2").contains("Chat Agents").as("agentPageHeader");
        cy.get("@agentPageHeader").should('be.visible');
        cy.get('@agentPageHeader').parent('div').find('button').contains('Manage').click();
        
    }
    VerifyAgentExist(){
      cy.contains('h3', this.selectors.agent1name).should('be.visible');
    }
    VerifyAgentIsActive(){
     cy.contains('h3', this.selectors.agent1name)
      .parentsUntil('body')         
      .contains('span', /^Active$/)
     .should('be.visible');
    }
    ClickOnlivePreview(){
      cy.contains('h3', this.selectors.agent1name)        
       .parentsUntil('body')                 
      .contains('button', 'Live Preview')
      .click();
      
       cy.get('#chat-widget-iframe', { timeout: 30000 }).should('be.visible');
       cy.wait(4000); 

    }

    getChatIframe() {
      // cy.frameLoaded('#chat-widget-iframe');
      return cy.iframe('#chat-widget-iframe');
    }

    OpenAgentChat(){
      
      this.getChatIframe().find('button').contains(this.selectors.OpenAgentChat, { timeout: 20000 }).should('be.visible').click();
    
    }

    verifyAgentLoaded(){

      this.getChatIframe().find('textarea').should('be.visible',{timeout:20000});
      this.getChatIframe().contains('span', `${this.selectors.agent1name}`)               
        .parent()                                    
        .find('span')                                
        .contains(/^Online$/)                        
       .should('be.visible');
    }

    VerifyLeadFormsInChat(){
      this.getChatIframe().find("h3").contains(this.selectors.leadFormHeader).should('be.visible');
    }

    FillName(name){
      this.getChatIframe().find('label').contains(this.selectors.Namelabel).parent('div').find('input').type(name);
    }
    fillEmail(email){
      this.getChatIframe().find(this.selectors.emailselector).type(email);
    }
    fillPhone(phoneNumber){
      this.getChatIframe().find(this.selectors.phoneSelector).type(phoneNumber);
    }
    fillLocation(location){
     this.getChatIframe().find('label').contains(this.selectors.locationlabel).parent('div').find('input').type(location);
    } 
    fillDate(){
      this.getChatIframe().find(this.selectors.dateselector).type(this.selectors.date,{force:true});
    }
    submitForm(){
      this.getChatIframe().find('button').contains('Submit').click();
    }
    waitForLeadSubmit() { 
     return cy.wait('@leadsFormSubmit')
      .its('response.statusCode')
      .should('eq', 200);
    }

    verifyFieldError(labelText, errorType = 'required') {
       const errorMessages = {
         'required': this.selectors.missingValueError,
         'invalidEmail': this.selectors.invalidEmailError,
         'invalidPhone': this.selectors.invalidPhoneError,
         'none': null  
       };
    // For non Reuired field, ensure no reuired error is shown
     if (errorType === 'none') {
      return this.verifyNoRequiredError(labelText);
     }

    const errorText = errorMessages[errorType];
    
    this.getChatIframe()
      .contains("h3", this.selectors.leadFormHeader)
      .parents("div")
      .find("label")
      .contains(labelText)
      .parent()
      .find("p")
      .should("contain.text", errorText)
      .and("be.visible");
    
    // return this; // Allow method chaining
    }


    verifyNoRequiredError(labelText) {
    this.getChatIframe()
    .contains("h3", this.selectors.leadFormHeader)           // anchor to form
    .parents("div")
    .find("label")
    .contains(labelText)
    .parent()
    .find("p",{timeout:5000})
    .should("not.exist");
     }


    navigatetoAgentChat(){
            this.navigateToAgentPage();
            this.VerifyAgentExist();
            this.VerifyAgentIsActive();
            this.ClickOnlivePreview();
            this.OpenAgentChat();
            this.verifyAgentLoaded();
    }
    

}
export const manageAgent = new ManageAgent();