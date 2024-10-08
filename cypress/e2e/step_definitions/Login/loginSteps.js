import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from "../../../pages/Login/loginPage";
const loginPage = new LoginPage();
const dataUtil = require("./../../../fixtures/Utils/data.json");

Given("que el usuario está en la página de login de Sauce Demo", () => {
  loginPage.visitarPaginaLogin(dataUtil.URL);
});

When("el usuario ingresa un nombre de usuario y contraseña válidos", () => {
  loginPage.ingresarUsuario(dataUtil.username);
  loginPage.ingresarContrasena(dataUtil.password);
});

When("hace clic en el botón de login", () => {
  loginPage.hacerClickEnLogin();
});

Then("el usuario debe ser redirigido a la página de productos", () => {
  loginPage.verificarRedireccion("/inventory.html", "Products");
});
