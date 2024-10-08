// Feature Login Page
export default class LoginPage {

  txtUsername = '[data-test="username"]';
  txtPassword = '[data-test="password"]';
  btnLogin = '[data-test="login-button"]';


  // Método para navegar a la página de login
  visitarPaginaLogin(URL) {
    cy.visit(URL);
  }

  // Método para ingresar el nombre de usuario
  ingresarUsuario(username) {
    cy.get(this.txtUsername).type(username);
  }

  // Método para ingresar la contraseña
  ingresarContrasena(password) {
    cy.get(this.txtPassword).type(password);
  }

  // Método para hacer clic en el botón de login
  hacerClickEnLogin() {
    cy.get(this.btnLogin).click();
  }

  // Método para verificar redirección exitosa
  verificarRedireccion(urlEsperada, tituloEsperado) {
    cy.url().should("include", urlEsperada);
    cy.get(".title").should("contain.text", tituloEsperado);
  }  
}
