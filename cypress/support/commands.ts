/// <reference types="cypress" />

Cypress.Commands.add('login', (email: string, password: string, tipoCuenta: string) => {
  cy.visit('http://10.43.103.108');

  cy.contains('Iniciar sesión').click();

  cy.get('select[name="accountType"]').select(tipoCuenta);
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="contrasena"]').type(password);

  cy.contains('Iniciar sesión').click();
});

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Comando para hacer login en la app.
       * @param email Correo del usuario
       * @param password Contraseña del usuario
       * @param tipoCuenta 'arrendador' | 'administrador'
       */
      login(email: string, password: string, tipoCuenta: string): Chainable<void>
    }
  }
}

export {}; // 👈 Esto evita errores TS con módulos
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }