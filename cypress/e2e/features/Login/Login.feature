Feature: Login en Sauce Demo

  Scenario: Login exitoso con credenciales válidas
    Given  que el usuario está en la página de login de Sauce Demo
    When  el usuario ingresa un nombre de usuario y contraseña válidos
    And hace clic en el botón de login
    Then  el usuario debe ser redirigido a la página de productos
