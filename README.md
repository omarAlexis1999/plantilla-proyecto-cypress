# Cypress E2E Template

## Instalación
1. Clonar el repositorio
2. Instalar dependencias: `npm install`
3. Configurar el archivo `.env` basado en `.env.template`



### Librerias Usadas
- [Node] - v20.10.0
- [Cypress] - ^13.6.0
- [cypress-mochawesome-reporter] - ^3.7.0
- [@badeball/cypress-cucumber-preprocessor] - ^19.2.0
- [@cypress/webpack-preprocessor] - ^6.0.0"
- [cypress-mochawesome-reporter] - ^3.7.0
- [webpack] - ^5.89.0
- [dotenv] - ^16.3.1
- [cypress-dotenv] - ^2.0.0

### Tecnologias Usadas

- Cypress: Framework de automatización de pruebas end-to-end (e2e) basado puramente en JavaScript y creado para la web moderna
- JavaScript: Lenguaje de programación interpretado
- Cucumber: Software de testing BDD (Behavior Driven Development)


### Comandos Ejecución proyecto

#### Ejecutar modo visual
```
npm run cypress:open
```

#### Ejecutar en Linea de Comandos (headless)
```
npm run cypress:run
```

#### Variables de Entorno a rellenar

Esta configuración permite enviar el reporte generado en Cypress por medio de correo electronico

Esta es un guia de como obtener las variables de entorno, puedes usar tu cuenta personal: [Cómo usar Nodemailer para enviar correos electrónicos desde tu servidor Node.js](https://www.freecodecamp.org/espanol/news/como-usar-nodemailer-para-enviar-correos-electronicos-desde-tu-servidor-node-js/)


| Variable |Descripción |
| ------ | ------ |
| GMAIL_CLIENT_ID | Campo client_id de Json de credenciales de Consola de Google |
| GMAIL_CLIENT_SECRET | Campo client_secret de Json de credenciales de Consola de Google |
| REPORTER_EMAIL| Correo electronico de la cuenta desde la cual se va a enviar el reporte |
| REPORTER_RECIPIENTS | Correos electronicos a los cuales se va a enviar el reporte (separados por coma) |
| REDIRECT_URL | URL de OAuth 2.0 Playground (https://developers.google.com/oauthplayground) |
| REFRESH_TOKEN| Campo refresh_token obtenido de OAuth 2.0 Playground de Google Developers |



### Logica de Componentes

#### Pages/Paginas
`cypress/pages/`

Se agregan en esta ruta los comandos para obtener items de una pagina en concreto con esto se logra dividir la logica en métodos por pagina para crear componentes reutilizables

Ejemplo
```javascript
// LoginPage.js

    inputIdentificacion = "#Identificacion";
    inputIClave = "#Clave";
    btnIngresa = "#btnIngresar";

    login(usuario, clave) {
        cy.get(this.inputIdentificacion).type(usuario);
        cy.get(this.inputIClave).type(clave);
    }
    
    enterLogin(){
        cy.get(this.btnIngresa).click();
    }
```


#### Definición de Casos de Prueba
`cypress/e2e/features`

Se agrega los casos de prueba con la Sintaxis Gherkin ordenadas en carpetas según la funcionalidad

Ejemplo:
Login.feature
``` {.sourceCode .gherkin}
Feature: Login en Sitio Web X

  Scenario: Login exitoso
    Given el usuario está en la página de inicio
    When ingresa el username "Admin" y contraseña "12345"
    And el usuario presiona el botón de Ingresar
    Then el usuario sera dirigido al Home
      
```
#### Pasos de los Casos de Prueba
`cypress/e2e/step_definitions`

Se debe agregar la funcionalidad para cada caso con el fin de ejecutar las pruebas automatizadas.

Ejemplo:

```javascript
// LoginSteps.js

Given('el usuario está en la página de inicio', () => {
  // Implementación para visitar la página de inicio
  cy.visit('https://example.com');  // Reemplaza con la URL real de tu sitio web
});

When('ingresa el username {string} y contraseña {string}', (username, password) => {
  // Implementación para ingresar credenciales de inicio de sesión
  loginPage.login(username,password); //Llamamos a metodo creado anteriormente
});

When('el usuario presiona el botón de Ingresar', () => {
  // Implementación para hacer clic en Ingresar
  loginPage.enterLogin(); //Llamamos a metodo creado anteriormente
});

Then('el usuario sera dirigido al Home', () => {
  // Implementación para verificar los resultados del login
});
```


##### Cada caso de Prueba definido con Gherkin

`Feature`

Se establece el Caso de Prueba con Gherkin

![image](/uploads/d6f21817d38549b43a3988b3c38caf6a/image.png)

##### Tendra una definición de sus pasos
`Step_definitions`

El archivo HomeSteps JS contiene pasos definidos y sus funcionalidades para cada paso
Estos pasos se vinculan al archivo .feature

![image](/uploads/09ccfb49016ead9a6cc29d2678e58265/image.png)

##### Y un archivo en la carpeta pages con los metodos necesarios para lograr ejecutar la funcionalidad necesaria

`Pages`

El archivo homePage contiene Funciones que se usaran en la logica de definir pasos (Step Definitions)

![image](/uploads/a88ce2bbb5f1a23c9eea12b57338864e/image.png)
