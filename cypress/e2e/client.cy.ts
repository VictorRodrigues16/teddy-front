/// <reference types="cypress" />

describe('Página de Clientes', () => {
    const API_URL = 'http://localhost:3000'; // substitua pela sua URL real da API se for diferente
  
    beforeEach(() => {
        localStorage.setItem('user', JSON.stringify({ name: 'teste' }));
        cy.visit('/clients'); // Visita a página inicial para garantir que o usuário esteja logado
      cy.intercept('GET', `${API_URL}/clients*`, {
        statusCode: 200,
        body: {
          data: [
            { id: '1', name: 'Client 1', salary: '1000', value: '5000' },
            { id: '2', name: 'Client 2', salary: '2000', value: '6000' }
          ],
          totalItems: 2,
          totalPages: 1
        }
      }).as('getClients');
    });
  
    it('deve carregar a página de clientes corretamente', () => {
      cy.visit('/clients');
      cy.contains('clientes encontrados');
    });
  
    it('deve exibir os clientes corretamente', () => {
      cy.visit('/clients');
      cy.wait('@getClients');
      cy.get('.client-card').should('have.length', 2);
    });
  
    it('deve abrir e submeter o modal de criação de cliente', () => {
      cy.intercept('POST', `${API_URL}/clients`, {
        statusCode: 201,
        body: { id: '3', name: 'New Client', salary: '3000', value: '7000' }
      }).as('createClient');
  
      cy.visit('/clients');
      cy.get('button').contains('Criar Cliente').click();
      cy.get('input[name="name"]').type('New Client');
      cy.get('input[name="salary"]').type('3000');
      cy.get('input[name="value"]').type('7000');
      cy.get('button').contains('Criar').click();
  
      cy.wait('@createClient');
    });
  
    it('deve exibir mensagem quando nenhum cliente for encontrado', () => {
      cy.intercept('GET', `${API_URL}/clients*`, {
        statusCode: 200,
        body: {
          data: [],
          totalItems: 0,
          totalPages: 1
        }
      }).as('getClients');
  
      cy.visit('/clients');
      cy.wait('@getClients');
      cy.contains('Nenhum cliente encontrado!');
    });
  
    it('deve abrir o modal de exclusão ao clicar na lixeira e excluir um cliente', () => {
        const clientNameToDelete = 'Client 1';
        cy.intercept('DELETE', `${API_URL}/clients/1`, {
          statusCode: 200,
          body: { message: 'Client deleted successfully' }
        }).as('deleteClient');
        
        cy.visit('/clients');
        cy.wait('@getClients');
      
        cy.get('.client-card').contains(clientNameToDelete).parents('.client-card').within(() => {
            cy.get('button[name="delete"]').click();
          });


        cy.get('button').contains('Excluir Cliente').click();
      
        cy.wait('@deleteClient');
      
      });
      
  
   
  
    it('deve fechar o modal ao clicar no botão "Fechar"', () => {
        cy.visit('/clients');
        cy.get('button').contains('Criar Cliente').click();
        cy.get('button[name="close-button"]').click();
        cy.get('.modal').should('not.exist');
      });
      
  });
  