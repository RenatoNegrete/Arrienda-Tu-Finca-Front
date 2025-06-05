describe('Administrador: Ver listado de fincas', () => {
  it('Inicia sesión como administrador y visualiza sus fincas', () => {
    // Abrir la página principal
    cy.visit('http://10.43.103.108');
    cy.visit('http://10.43.103.108');
    cy.contains('Bienvenidos a FincaForYou');

    // Verifica que existen los botones de inicio de sesión y crear cuenta
    cy.contains('Iniciar sesión');
    cy.contains('Crea tu cuenta');

    cy.get('a').should('have.length.at.least', 3);

    // Haz clic en "Iniciar sesión"
    cy.contains('Iniciar sesión').click();

    // Verifica los campos del login
    cy.get('select[name="accountType"]').should('exist');
    cy.get('input[name="email"]').should('exist');
    cy.get('input[name="contrasena"]').should('exist');

    // Selecciona el tipo de cuenta "administrador"
    cy.get('select[name="accountType"]').select('administrador');

    // Ingresa las credenciales de admin
    cy.get('input[name="email"]').type('juanito@example.com'); // Cambia por el admin real
    cy.get('input[name="contrasena"]').type('123456789'); // Cambia por la clave real

    // Haz clic en "Iniciar sesión"
    cy.contains('Iniciar sesión').click();

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


    // O valida la existencia de cards o filas (ajusta según tu HTML real)
//cy.get('.finca-card').should('have.length.at.least', 1);
  });
});
