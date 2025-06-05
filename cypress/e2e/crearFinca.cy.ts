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

    cy.contains('adir').click();

    cy.get('input[name="nombre"]').should('exist');
    cy.get('input[name="ingreso"]').should('exist');
    cy.get('input[name="descripcion"]').should('exist');
    cy.get('input[name="habitaciones"]').should('exist');
    cy.get('input[name="banos"]').should('exist');
    cy.get('select[name="mascotas"]').should('exist');
    cy.get('select[name="piscina"]').should('exist');
    cy.get('select[name="asador"]').should('exist');
    cy.get('input[name="valor"]').should('exist');
    cy.get('select[name="departamento"]').should('exist');
    cy.get('select[name="municipio"]').should('exist');

    cy.get('input[name="nombre"]').type('Finca La Vega');
    cy.get('input[name="ingreso"]').type('Avenida Principal');
    cy.get('input[name="descripcion"]').type('Finca grande');
    cy.get('input[name="habitaciones"]').type('3');
    cy.get('input[name="banos"]').type('2');
    cy.get('select[name="mascotas"]').select('No');
    cy.get('select[name="piscina"]').select('No');
    cy.get('select[name="asador"]').select('No');
    cy.get('input[name="valor"]').type('150');
    cy.get('select[name="departamento"]').select('1');
    cy.get('select[name="municipio"]').select('1');

    cy.contains('Añadir finca').click();
    
    cy.contains('Detalle').click();

  })
})