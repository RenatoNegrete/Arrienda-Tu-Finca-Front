describe('template spec', () => {
  beforeEach(() => {
    cy.login('juanito@example.com', '123456789', 'administrador');
  });

  it('passes', () => {
    // Espera a que cargue la pantalla de bienvenida
    cy.contains('Bienvenido a FincaForYou');

    // Haz clic en "Ver tus fincas"
    cy.contains('Ver tus fincas').should('be.visible').click();

    // Aquí validamos que aparece la lista de fincas
    // Ajusta los selectores según cómo se muestren en tu app
    cy.url().should('include', '/showfincasadmin');

    // Por ejemplo, si hay un título o lista de fincas
    // Puedes cambiar el texto o selector según lo que tu app muestre
    cy.contains('Tus Fincas');
    
    cy.contains('Detalle').click();

    cy.contains('Por Aceptar').click()

  })
})