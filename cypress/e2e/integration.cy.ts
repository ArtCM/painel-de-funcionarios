describe('Full Integration Test', () => {
  const testEmployee = {
    name: 'João Silva Teste',
    email: `integracao${Date.now()}@teste.com`,
    cpf: '984.705.250-69',
    phone: '(11) 88888-8888',
    dateOfBirth: '15/05/1985',
    typeOfHiring: 'PJ'
  };

  beforeEach(() => {
    cy.clearLocalStorage();
    cy.window().then((win) => {
      win.localStorage.setItem('userName', 'Teste Integração');
    });
  });

  it('should complete full employee lifecycle', () => {
    // 1. Acessa a home
    cy.visit('/');
    cy.contains('Bem-vindo, Teste Integração!').should('be.visible');
    
    // 2. Navega para funcionários
    cy.get('a[href="/employees"]').click();
    cy.url().should('include', '/employees');
    
    // 3. Vai para criar funcionário
    cy.get('a[href="/employees/new-employee"]').click();
    cy.url().should('include', '/employees/new-employee');
    
    // Aguarda a página carregar completamente
    cy.get('h1').should('contain', 'Novo Funcionário');
    
    // 4. Cria um novo funcionário
    cy.get('form').within(() => {
      cy.get('input').eq(0).type(testEmployee.name);
      cy.get('input').eq(1).type(testEmployee.email);
      cy.get('input').eq(2).type(testEmployee.cpf);
      cy.get('input').eq(3).type(testEmployee.phone);
      cy.get('input').eq(4).type(testEmployee.dateOfBirth);
      
      // Abre o select
      cy.get('button[role="combobox"]').first().click();
    });
    
    // Seleciona PJ usando force: true para contornar pointer-events: none
    cy.contains('PJ').click({ force: true });
    
    cy.get('button[type="submit"]').click();
    
    // 5. Verifica se voltou para lista
    cy.url().should('include', '/employees');
    cy.contains(testEmployee.name, { timeout: 15000 }).should('be.visible');
    
    // 6. Busca pelo funcionário criado
    cy.get('input[placeholder*="Buscar"]')
      .clear()
      .type(testEmployee.name);
    
    cy.wait(2000);
    cy.contains(testEmployee.name).should('be.visible');
    
    // 7. Edita o funcionário - força scroll e clique
    cy.get('[data-slot="table-container"]').scrollTo('right');
    cy.get('[data-testid="edit-button"]').first().click({ force: true });
    cy.url().should('include', '/edit');
    
    const updatedName = 'Maria Santos Editado';
    cy.get('form').within(() => {
      cy.get('input').eq(0).clear().type(updatedName);
    });
    
    cy.get('button[type="submit"]').click();
    
    // 8. Verifica se a edição foi salva
    cy.url().should('include', '/employees');
    cy.contains(updatedName, { timeout: 15000 }).should('be.visible');
    
    // 9. Deleta o funcionário - força scroll e clique
    cy.get('[data-slot="table-container"]').scrollTo('right');
    cy.get('[data-testid="delete-button"]').first().click({ force: true });
    cy.get('[data-testid="confirm-delete-btn"]').first().click();
    
    // 10. Verifica se foi deletado
    cy.wait(2000);
    cy.contains(updatedName).should('not.exist');
  });
});






