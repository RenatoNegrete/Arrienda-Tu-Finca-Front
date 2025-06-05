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

    cy.contains('Por Calificar').click();
    cy.get('.formulario-comentario').within(() => {
      cy.get('input[name="puntuacion"]').first().type('4');
      cy.get('input[name="comentario"]').first().type('Buena finca');
      cy.get('input[name="puntuacion"]').eq(1).type('5');
      cy.get('input[name="comentario"]').eq(1).type('Excelente atención');

      cy.get('[data-cy="btn-calificar"]').click();
    });
  });
})