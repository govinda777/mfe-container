describe('Redux Store Integration', () => {
  beforeEach(() => {
    // Visit the home page before each test
    cy.visit('/');
  });

  it('should update the store when selecting a provider', () => {
    // Check initial provider state
    cy.window().its('store').invoke('getState').its('providers.selectedProvider')
      .should('equal', 'provider1'); // Assuming provider1 is the default

    // Select a different provider
    cy.get('.ant-select').click();
    cy.contains('Provider 2').click();

    // Verify the store has been updated
    cy.window().its('store').invoke('getState').its('providers.selectedProvider')
      .should('equal', 'provider2');
  });

  it('should update the store when selecting a menu item', () => {
    // Check initial menu state
    cy.window().its('store').invoke('getState').its('menu.selectedMenuItem')
      .should('equal', 'home'); // Assuming home is the default

    // Select a different menu item
    cy.contains('Products').click();

    // Verify the store has been updated
    cy.window().its('store').invoke('getState').its('menu.selectedMenuItem')
      .should('equal', 'products');

    // Select another menu item
    cy.contains('About').click();

    // Verify the store has been updated again
    cy.window().its('store').invoke('getState').its('menu.selectedMenuItem')
      .should('equal', 'about');
  });

  it('should reflect store changes in the UI', () => {
    // Select a menu item
    cy.contains('Products').click();

    // Verify the content has changed to reflect the store state
    cy.contains('Products Page Content').should('be.visible');

    // Select another menu item
    cy.contains('About').click();

    // Verify the content has changed again to reflect the store state
    cy.contains('About Page Content').should('be.visible');
  });
});