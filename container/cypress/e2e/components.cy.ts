describe('Component Tests', () => {
  beforeEach(() => {
    // Visit the home page before each test
    cy.visit('/');
  });

  describe('Navbar Component', () => {
    it('should display the title correctly', () => {
      cy.contains('Container App').should('be.visible');
      cy.contains('Container App').should('have.css', 'color', 'rgb(255, 0, 0)'); // Red color
    });

    it('should display the provider dropdown', () => {
      cy.get('.ant-select').should('be.visible');
    });

    it('should allow selecting a provider', () => {
      cy.get('.ant-select').click();
      cy.contains('Provider 2').click();
      cy.get('.ant-select').should('contain', 'Provider 2');
    });
  });

  describe('SideMenu Component', () => {
    it('should display all menu items', () => {
      cy.get('[data-testid="menu"]').should('be.visible');
      cy.contains('Home').should('be.visible');
      cy.contains('Products').should('be.visible');
      cy.contains('About').should('be.visible');
      cy.contains('Contact').should('be.visible');
    });

    it('should highlight the selected menu item', () => {
      cy.contains('Home').parent('li').should('have.class', 'ant-menu-item-selected');
      cy.contains('Products').click();
      cy.contains('Products').parent('li').should('have.class', 'ant-menu-item-selected');
      cy.contains('Home').parent('li').should('not.have.class', 'ant-menu-item-selected');
    });

    it('should navigate to the correct page when clicking a menu item', () => {
      cy.contains('Products').click();
      cy.contains('Products Page Content').should('be.visible');
      cy.contains('About').click();
      cy.contains('About Page Content').should('be.visible');
      cy.contains('Contact').click();
      cy.contains('Contact Page Content').should('be.visible');
      cy.contains('Home').click();
      // Home should show the TestPage component or fallback
      cy.get('.ant-layout-content').should('be.visible');
    });
  });

  describe('Layout Structure', () => {
    it('should have the correct layout structure', () => {
      // Check if the layout components are present
      cy.get('.ant-layout').should('be.visible');
      cy.get('.ant-layout-header').should('be.visible');
      cy.get('.ant-layout-sider').should('be.visible');
      cy.get('.ant-layout-content').should('be.visible');
      cy.get('.ant-layout-footer').should('be.visible');
      
      // Check if the footer has the correct text
      cy.get('.ant-layout-footer').should('contain', 'Footer');
    });
  });
});