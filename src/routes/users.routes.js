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
// Generalmente, por buenas prácticas, la creación de nuevos registros se realiza usando la misma ruta para listar todos
router.post("/users", controller.createUser);
router.put("/users/:id", controller.updateUserByID);
router.delete("/users:id", controller.deleteUserByID); */

// Exportando el 'router' como módulo, para ser utilizado dentro de otros módulos del proyecto
// export default router;

// REFACTORIZACIÓN DE 'ROUTES' A CLASES ES6
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
    this.#router.get("/users", this.#controllers.getUsers);
    this.#router.get("/users/:id", this.#controllers.getUserByID);
    this.#router.post("/users", this.#controllers.createUser);
    // this.#router.put("/users/:id", this.#controllers.updateUserByID);
    // this.#router.delete("/users:id", this.#controllers.deleteUserByID);

    // Error comun: Una vez definidas las rutas para este 'endpoint', siempre devolvemos el 'router'
    return this.#router;
  }
}
