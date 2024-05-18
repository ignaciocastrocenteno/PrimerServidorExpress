// Importamos Express en este archivo, para la creación del 'router' relacionada a este 'endpoint': /users
/* No es necesario importar Express en los demás archivos encadenados, ya que este es el archivo que tiene la
responsabilidad de hacer el enrutamiento de la entidad. */
import express from "express";
// Importamos el controlador relacionado a la entidad, para pedirle que traiga la información solicitada por el usuario
// import controller from "../controllers/users.controllers.js";
import UserControllers from "../controllers/users.controllers.js";

// const router = express.Router();

/* Declaración de rutas para este 'endpoint' /users - El archivo 'routes' sólo se encarga de declarar
las rutas de la entidad, no de cómo estas funcionan. */

/* router.get("/users", controller.getUsers);
router.get("/users/:id", controller.getUserByID);
router.post("/users", controller.createUser);
router.put("/users/:id", controller.updateUserByID);
router.delete("/users:id", controller.deleteUserByID); */

// Exportando el 'router' como módulo, para ser utilizado dentro de otros módulos del proyecto
// export default router;

export default class UserRouter {
  #router;
  #controllers;

  constructor() {
    // Creamos el router de Express dentro del constructor con la misma sintaxis de antes
    this.#router = express.Router();
    this.#controllers = new UserControllers();
  }

  // Como las rutas no son funciones, generamos un método para que se inicialicen al ser llamado el método
  start() {
    this.#router.get("/users", controller.getUsers);
    this.#router.get("/users/:id", controller.getUserByID);
    this.#router.post("/users", controller.createUser);
    this.#router.put("/users/:id", controller.updateUserByID);
    this.#router.delete("/users:id", controller.deleteUserByID);

    // Error comun: Una vez definidas las rutas para este 'endpoint', siempre devolvemos el 'router'
    return this.#router;
  }
}
