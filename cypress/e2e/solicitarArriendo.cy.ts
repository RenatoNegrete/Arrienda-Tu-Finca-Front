describe('template spec', () => {
  beforeEach(() => {
    cy.login('juan@example.com', 'MiClaveSegura123', 'arrendador');
  });

  it('debería poder ver el panel principal', () => {
    cy.contains('Bienvenido a FincaForYou');
    cy.contains('Ver Fincas');
    cy.contains('Ver tus Solicitudes');

    cy.contains('Ver Fincas').click();

    cy.contains('Fincas en alquiler');

    cy.contains('button', 'Ver Detalles').first().click();

    cy.contains('Descripción');
    cy.contains('Características');

    cy.contains('button', 'Solicitar').click();

    cy.contains('Haz una solicitud')

    cy.get('input[name="llegada"]').should('exist');
    cy.get('input[name="salida"]').should('exist');
    cy.get('input[name="personas"]').should('exist');

    cy.get('input[name="llegada"]').type('2025-08-10');
    cy.get('input[name="salida"]').type('2025-08-12');
    cy.get('input[name="personas"]').type('4');

    cy.contains('button', 'Hacer solicitud').click();
  });
})