# Desafio vita wallet
Es un placer participar en este desafío para su empresa. Agradezco sinceramente que hayan tomado el tiempo para considerarme para el puesto. He trabajado en este proyecto con gran dedicación y pasión, cuidando cada detalle. Espero que lo disfruten tanto como yo disfruté desarrollándolo.

## Accesos

el usuario:prospecto@vitawallet.io
contrasenia: Vita.1212
Con esa informacion pueden acceder en el login, los demas datos como accessToken, cliente, uid, etc son solicitados desde la API al realizar el inicio de sesion.

## Descripción

El proyecto consiste en un sistema de login donde los usuarios pueden acceder con los datos proporcionados o seleccionar la opción de registrarse para acceder a la pantalla. (No es funcional, pero cuenta con la verificación de los datos solicitados).

La pantalla de inicio muestra detalles del historial de transacciones y el saldo en las monedas disponibles. En el modelo, hay disponibilidad en moneda CLP. Dado que esa moneda no se encuentra en la API, el saldo aparece en 0.

En la sección de transferencias, los usuarios pueden ver las pantallas diseñadas. El diseño contiene datos insertados en HTML ya que no son datos disponibles en una base de datos.

En la sección de intercambio, los usuarios pueden realizar un cambio por otra moneda disponible en la base de datos, realizar el envío y visualizarlo nuevamente en la pantalla de inicio.

Los usuarios pueden cerrar sesión de manera funcional.

Las rutas están protegidas para mayor seguridad, de modo que no se podrá acceder a ningún componente sin iniciar sesión.





