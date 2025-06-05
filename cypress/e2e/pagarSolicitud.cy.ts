describe('template spec', () => {
  beforeEach(() => {
    cy.login('juan@example.com', 'MiClaveSegura123', 'arrendador');
  });

  it('debería poder ver el panel principal', () => {
    cy.contains('Bienvenido a FincaForYou');
    cy.contains('Ver Fincas');
    cy.contains('Ver tus Solicitudes');

    cy.contains('Ver tus Solicitudes').click();

    cy.contains('Solicitudes de Arriendo');

    cy.contains('Aceptadas').click();

    cy.contains('Pagar').click();
    // Seleccionar un banco (por el valor del <option>)
    cy.get('select[name="banco"]').select('1'); // Reemplaza "1" por el ID real del banco que quieras seleccionar

    // Llenar número de cuenta
    cy.get('input[name="numCuenta"]').type('1234567890');

    // Confirmar el pago
    cy.contains('button', 'Confirmar Pago').click();

    cy.contains('Por Calificar').click();
  });
})