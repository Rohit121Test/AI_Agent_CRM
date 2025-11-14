class GlobalChatDetail {
  selectors = {
    pageTitle: 'h1',
    chatheader:'Handled Chats',
    chatdashboard:"Skip and Continue to dashboard →"
    }

    visit() {
        cy.visit('/chat/chats');
        cy.get(this.selectors.pageTitle).contains("Chat Agents").should('be.visible', { timeout: 150000 });
    }
    gotoChatboard() {
      cy.get('button').contains(this.selectors.chatdashboard).click();
    }

    waitForChatsToLoad() {
      cy.get("h2").contains(this.selectors.chatheader).should('be.visible', { timeout: 150000 });
    }

    VerfiyNameUpdate(name){
        cy.contains('h2',this.selectors.chatheader )
          .parentsUntil('body')
          .find('p')
          .contains(name)
          .should('be.visible');
    }
    navigateToChatDetail(){
            this.visit();
            this.gotoChatboard();
            this.waitForChatsToLoad();
    }

}
export const globalChatDetail = new GlobalChatDetail();