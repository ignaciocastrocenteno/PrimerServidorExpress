// Importando el framework Express para utilizarlo dentro del archivo principal
import express from "express";

// Creando el 'web server' basado en Express
const app = express();
const PORT = 8080;

/* Middleware para trabajar con el protocolo HTTP; nos permite enviar información a través del 'body' de la petición
- req.body */
app.use(express.json());
// Middleware para trabajar con datos enviados a través de URL - req.params
app.use(express.urlencoded({extended: true}));

// Estableciendo las 'routes' que forman parte de la API
/* app.use("/", productsRoutes); */

// Diciéndole al servidor web que se encuentre a la escucha de peticiones HTTP sobre el puerto 8080 local
app.listen(PORT, () => {
  console.log("Server already running in port localhost :8080");
});

// Si hubiese algún problema al momento de correr el servidor web, enviamos un error por la consola
app.on("error", (errorDetail) => {
  console.error(
    `An error has ocurred while setting up the web server: ${errorDetail}`
  );
});
