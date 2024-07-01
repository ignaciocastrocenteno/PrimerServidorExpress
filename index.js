// Importando el framework Express para utilizarlo dentro del archivo principal
import express from "express";
// import router from "./src/routes/users.routes.js";
import UserRouter from "./src/routes/user.routes.js";
import config from "./config.js";

// Creando el 'web server' basado en Express
const app = express();
// Estableciendo el puerto de conexión donde operará el 'web server'
// const PORT = 8080;

/* Middleware para trabajar con el protocolo HTTP; nos permite enviar información a través del 'body' de la petición
- req.body */
app.use(express.json());
// Middleware para trabajar con datos enviados a través de URL - req.params
app.use(express.urlencoded({extended: true}));

/* Estableciendo los 'endpoints' disponibles dentro de la API. Si tenemos más de una entidad dentro del sistema, para poder
   ser accederlas a nivel URL, deben ser agregadas dentro del archivo 'index.js', como vemos acá abajo.
*/
// Este 'endpoint' nos da acceso a todas las rutas de la entidad 'Usuario', por medio de la instaciación de su 'router'.
app.use("/", new UserRouter().start());

// Diciéndole al servidor web que se encuentre a la escucha de peticiones HTTP sobre el puerto 8080 local
app.listen(config.PORT, () => {
  console.log(`Server already running in port localhost ${config.PORT}`);
});

// Si hubiese algún problema al momento de correr el servidor web, enviamos un error por la consola
app.on("error", (errorDetail) => {
  console.error(
    `An error has ocurred while setting up the web server: ${errorDetail}`
  );
});
