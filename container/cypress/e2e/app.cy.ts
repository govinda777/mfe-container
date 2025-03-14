describe('Container App', () => {
  beforeEach(() => {
    // Visit the home page before each test
    cy.visit('/');
  });

  it('should load the application correctly', () => {
    // Check if the application has loaded correctly
    cy.get('div').should('exist');
    cy.contains('Container App').should('be.visible');
  });

  it('should display the Navbar with title and provider dropdown', () => {
    // Check if the Navbar is visible
    cy.contains('Container App').should('be.visible');
    
    // Check if the provider dropdown is visible and can be interacted with
    cy.get('.ant-select').should('be.visible');
    cy.get('.ant-select').click();
    cy.contains('Provider 1').should('be.visible');
    cy.contains('Provider 2').should('be.visible');
    cy.contains('Provider 3').should('be.visible');
    
    // Select a provider and verify it's selected
    cy.contains('Provider 2').click();
    cy.get('.ant-select').should('contain', 'Provider 2');
  });

  it('should display the SideMenu with menu items', () => {
    // Check if the SideMenu is visible
    cy.get('[data-testid="menu"]').should('be.visible');
    
    // Check if all menu items are visible
    cy.contains('Home').should('be.visible');
    cy.contains('Products').should('be.visible');
    cy.contains('About').should('be.visible');
    cy.contains('Contact').should('be.visible');
  });

  it('should change content when clicking on different menu items', () => {
    // Initially, the Home page should be selected and TestPage should be displayed
    cy.contains('Home').parent('li').should('have.class', 'ant-menu-item-selected');
    
    // Click on Products and verify the content changes
    cy.contains('Products').click();
    cy.contains('Products Page Content').should('be.visible');
    cy.contains('Products').parent('li').should('have.class', 'ant-menu-item-selected');
    
    // Click on About and verify the content changes
    cy.contains('About').click();
    cy.contains('About Page Content').should('be.visible');
    cy.contains('About').parent('li').should('have.class', 'ant-menu-item-selected');
    
    // Click on Contact and verify the content changes
    cy.contains('Contact').click();
    cy.contains('Contact Page Content').should('be.visible');
    cy.contains('Contact').parent('li').should('have.class', 'ant-menu-item-selected');
    
    // Click back on Home and verify the content changes back
    cy.contains('Home').click();
    cy.contains('Home').parent('li').should('have.class', 'ant-menu-item-selected');
  });
});