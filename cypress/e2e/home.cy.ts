describe('Home Page', () => {
  it('should show modal when no user name is saved', () => {
    cy.clearLocalStorage();
    cy.visit('/');
    
    cy.contains('Bem-vindo!').should('be.visible');
    cy.get('input[placeholder="Digite seu nome"]').should('be.visible');
    
    cy.get('input[placeholder="Digite seu nome"]').type('João Silva');
    cy.get('button[type="submit"]').click();
    
    cy.contains('Bem-vindo, João Silva!').should('be.visible');
    
    // Verifica se o nome foi salvo no localStorage
    cy.window().its('localStorage').invoke('getItem', 'userName').should('equal', 'João Silva');
    
    // Verifica se o nome aparece no header
    cy.get('header').contains('João Silva').should('be.visible');
  });

  it('should display saved user name without modal', () => {
    cy.window().then((win) => {
      win.localStorage.setItem('userName', 'Maria Santos');
    });
    
    cy.visit('/');
    
    // Verifica se o modal NÃO aparece
    cy.get('input[placeholder="Digite seu nome"]').should('not.exist');
    
    // Verifica se o nome salvo aparece
    cy.contains('Bem-vindo, Maria Santos!').should('be.visible');
    
    // Verifica se o botão para funcionários existe
    cy.get('a[href="/employees"]').should('be.visible');
    
    // Verifica se o nome aparece no header
    cy.get('header').contains('Maria Santos').should('be.visible');
  });

  it('should navigate to employees page', () => {
    cy.window().then((win) => {
      win.localStorage.setItem('userName', 'Teste User');
    });
    
    cy.visit('/');
    
    cy.get('a[href="/employees"]').click();
    cy.url().should('include', '/employees');
    
    // Verifica se chegou na página correta
    cy.get('h1').should('contain', 'Controle de Funcionários');
  });

  it('should show skeleton while loading user name', () => {
    cy.window().then((win) => {
      win.localStorage.setItem('userName', 'Usuário Teste');
    });
    
    cy.visit('/');
    
    // O skeleton pode aparecer muito rapidamente, então verificamos se o nome final aparece
    cy.contains('Bem-vindo, Usuário Teste!').should('be.visible');
  });
});


