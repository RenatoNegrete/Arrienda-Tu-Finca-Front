describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://10.43.103.108')
    cy.contains('Bienvenidos a FincaForYou');

    cy.contains('Iniciar sesión');
    cy.contains('Crea tu cuenta');

    cy.get('a').should('have.length.at.least', 3);

    cy.contains('Crea tu cuenta').click();

    cy.get('select[name="accountType"]').should('exist');
    cy.get('input[name="nombre"]').should('exist');
    cy.get('input[name="apellido"]').should('exist');
    cy.get('input[name="telefono"]').should('exist');
    cy.get('input[name="email"]').should('exist');
    cy.get('input[name="contrasena"]').should('exist');

    cy.get('select[name="accountType"]').select('administrador');
    cy.get('input[name="nombre"]').type('Juan');
    cy.get('input[name="apellido"]').type('Pérez');
    cy.get('input[name="telefono"]').type('3111234567');
    cy.get('input[name="email"]').type('juanito@example.com');
    cy.get('input[name="contrasena"]').type('123456789');

    cy.contains('Crear Cuenta').click();
    
  })
})