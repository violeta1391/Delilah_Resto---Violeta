
#   Delilah Restó   #

`App de pedidos de comida`


# Proyecto Nº3 del curso de Desarrollo Web Full Stack de Acámica.

El objetivo del proyecto es generar el back-end para una aplicación de entrega de alimentos, creando la arquitectura, bases de datos relacionales, endpoints funcionales y documentación.


# Recursos y tecnologías: 

- Node.js
- Express
- JWT para autenticación via Token
- MySQL
- Postman para manejo de endpoints y testing
- Swagger para documentación de API


# Documentación API:

- Copiar el contenido del archivo `api-docs.yaml` en [Swagger](https://editor.swagger.io/) o importarlo desde las opciones. Se listarán los endpoints y métodos disponibles, junto con la información necesaria para utilizar la API. 


# Instalación e inicialización:

# 1. Clonar el proyecto 

- Clonar el repositorio desde https://github.com/violeta1391/Delilah_Resto---Violeta


# 2. Instalar dependencias 

- En la carpeta raiz abre una terminal y ejcuta el comando 'npm install'


# 3. Crear la base de datos

- Abrir XAMPP e iniciar los servicios de Apache y MySQL en el puerto `3306`.

- Dirigirse al panel de control del servicio MySQL y crear una nueva base de datos con el nombre `delilah_resto`

- En el archivo `/queries.sql` se encuentran las queries necesarias para crear las tablas de datos. 
  Puede importar este archivo, o ejecutarlas dentro del panel de control de la base de datos.


# 4. Iniciar el servidor

- Abrir el archivo en `/server.js` y ejecutar en la terminal `node server`


# 5. Testear endpoints

- Importar el archivo `Delilah_restó.postman_collection.json` desde la aplicación.

- Para acceder a ciertas funcionalidades de al aplicación, es necesario utilizar en la sección de postman de autorización, el token que se genera al loguearse con usuario y contraseña válidos.
Tener en cuenta que algunas rutas son sólo accesibles para el administrador.  


