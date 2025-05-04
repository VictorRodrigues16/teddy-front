describe('Login Page', () => {
    beforeEach(() => {
      cy.visit('/'); 
    });
  
    it('should show an error when name is empty and user tries to login', () => {
      cy.get('button').contains('Entrar').click();
  
      cy.get('p')
        .should('have.text', 'Por favor, digite seu nome.');
    });
  
    it('should show an error when name is invalid and user tries to login', () => {
      cy.get('input[name="name"]').type('123');
  
      cy.get('button').contains('Entrar').click();
  
      cy.get('p')
        .should('have.text', 'Por favor, digite um nome válido.');
    });
  
    it('should redirect to /clients when the name is valid', () => {
      cy.get('input[name="name"]').type('Teste');
  
      cy.get('button').contains('Entrar').click();
  
      cy.url().should('include', '/clients');
    });
  });
  