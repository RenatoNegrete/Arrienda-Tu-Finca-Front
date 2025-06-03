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
  });
})