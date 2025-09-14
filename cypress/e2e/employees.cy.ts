describe('Employees Management', () => {
  it('should display employees page', () => {
    cy.visit('/employees');
    
    cy.get('h1').should('contain', 'Controle de Funcionários');
    
    cy.get('input[placeholder="Buscar Funcionário..."]').should('be.visible');
    
    cy.get('a[href="/employees/new-employee"]').should('be.visible');
  });

  it('should navigate to new employee page', () => {
    cy.visit('/employees');
    
    cy.get('a[href="/employees/new-employee"]').click();
    cy.url().should('include', '/employees/new-employee');
  });

  it('should allow typing in search field', () => {
    cy.visit('/employees');
    
    cy.get('input[placeholder="Buscar Funcionário..."]')
      .type('João')
      .should('have.value', 'João');
  });
});



