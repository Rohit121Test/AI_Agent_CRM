
class ContactCrm {
  selectors = {
    pageTitle: 'h1',
    tableRow: 'table tbody tr',
    nameInput: 'input[placeholder="Set Name"]',
    phoneInput: 'input[type="tel"]',
    emailInput: 'input[placeholder="Set Email Addresses"]',
    submitButton: 'button[type="submit"]'
    };

    visit() {
        cy.visit('/crm/contacts');
        cy.get(this.selectors.pageTitle).contains("Contacts").should('be.visible');
    }
    getContactsData() {
        return cy.get('@getContacts')
          .its('response.body');
    }
    waitForContactsToLoad() {
    return cy.wait('@getContacts')
      .its('response.statusCode')
      .should('eq', 200);
    }
    ContactEditPage(){
      cy.get(this.selectors.tableRow).first().find("td:last-child").click();
      cy.get('button').contains(/Edit/i).click();
    }
    updateName(name){
      cy.get(this.selectors.nameInput).clear().type(name);
    }
    updatePhoneNumber(phoneNumber){
        cy.contains('label', 'Phone Numbers')      
          .parent()                                
          .find('button')                          
          .click(); 
        cy.get('span').contains('Set Phone Numbers').click();
        cy.contains('button', 'Add new phone number').click();
        cy.get(this.selectors.phoneInput).type(phoneNumber);
        cy.get('button').contains(/Add new phone number/).click();

    }

    verifyApiLeadCreated(expectedData) {
    const { name, email, phoneNumber, location } = expectedData;
    
    this.getContactsData().then((contacts) => {
      const expectedPhone = this.normalizePhone(phoneNumber);
      const record = contacts.find(item => item.emails.includes(email));
      
      expect(record, "Lead successfully created in Contact").to.exist;
      expect(record.name, "Contact name matches").to.equal(name);
      expect(record.emails[0], "Contact email matches").to.include(email);
      expect(record.phone_numbers[0], "Contact phone matches").to.include(expectedPhone);
    
      // expect(record.location, "Contact location matches").to.equal(location);
      
    });
    }
    SearchContactByEmail(email) {
    cy.get('input[placeholder="Search"]').type(email);
    cy.wait(2000);
      
    }
    verifyLeadUI(expectedData){
      const { name, email, phoneNumber, location } = expectedData;
      cy.get('input[placeholder="Search"]').eq(0).type(email).then(() => {
    cy.get('table tbody tr').first().within(() => {
      const expectedPhone = this.normalizePhone(phoneNumber);

      cy.get('td').eq(1).should('have.text', name); 
      cy.get('td').eq(2).should('have.text', email);
      cy.get('td').eq(3).should('include.text', expectedPhone);
      // cy.get('td').eq(10).should('have.text', location);
      
    }
    )
  })
}

    updateEmial(email){
        cy.contains('label', 'Email Address')      
          .parent()                                
          .find('button')                          
          .click();
        cy.get(this.selectors.emailInput).clear().type(email); 
       
    }
    saveContact(){
        cy.get(this.selectors.submitButton).click();   
    }
    
  normalizePhone(num) {
    return num.replace(/\D/g, "");
  }
       



}
export const contactCrm = new ContactCrm();