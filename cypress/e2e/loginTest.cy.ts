describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://10.43.103.108')
    cy.visit('http://10.43.103.108')
    cy.contains('Bienvenidos a FincaForYou');

    cy.contains('Iniciar sesión');
    cy.contains('Crea tu cuenta');

    cy.get('a').should('have.length.at.least', 3);

    cy.contains('Iniciar sesión').click();

    cy.get('select[name="accountType"]').should('exist');
    cy.get('input[name="email"]').should('exist');
    cy.get('input[name="contrasena"]').should('exist');

    cy.get('select[name="accountType"]').select('arrendador');
    cy.get('input[name="email"]').type('juan@example.com');
    cy.get('input[name="contrasena"]').type('MiClaveSegura123');

    cy.contains('Iniciar sesión').click();

  })
})