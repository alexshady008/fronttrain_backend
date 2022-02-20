# Front Train, Distribuidora de Tren delantero - API REST

## Tecnologías
Este proyecto es el backend de la distribuidora Front Train desarrollada en NodeJs y utilizando las siguientes tecnologías: 
     -Express 
    - MySQL
    - ORM Sequelize
    - Hapi/boom
    - Bcrypt
    - Joi
    - JWT
    - Passport
    - Multer
    - Nodemailer
    - Nodemon


## Capas de la Api Rest:

### Index
### Middleware y configuraciones
    Carpeta estática Public - lectura de Json y de texto en POST - Cors - Inizialización de Passport y Estrategias
#### Rutas
    Enrutamiento de todos los endpoints
#### Validaciones
    Validaciones con Joi y utilizando esquemas
#### Multer 
    Configuraciones con Multer para las imagenes
#### Passport - local - JWT 
    Validaciones con passport utilizando la estrategia de Inicio de Sesion y de Json Web Token
#### Controladores
    Controlar las solicitudes del cliente - Solicitar datos a la capa de Servicios - Controlar las respuestas a los clientes 
#### Servicios - DB - Modelos 
    Consultas a la base de datos - Configuración de modelos y asosiaciones en Sequelize - Migraciones
#### Middleware de Errores
    Manejo de errores con happi/boom y Sequelize 


## Scripts Disponibles
En este proyecto podrás ejecutar los siguientes scripts: 
### `npm start`
### `npm run dev`
### `npm run migrations:generate`
### `npm run migrations:run`
### `npm run migrations:revert`
### `npm run migrations:delete`
### `npm run migrations:debug`
