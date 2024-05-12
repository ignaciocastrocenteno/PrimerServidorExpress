// Importamos Express en este archivo, para la creación del 'router' relacionada a este 'endpoint': /users
/* No es necesario importar Express en los demás archivos encadenados, ya que este es el archivo que tiene la
responsabilidad de hacer el enrutamiento de la entidad. */
import express from "express";
// Importamos el controlador relacionado a la entidad, para pedirle que traiga la información solicitada por el usuario
import controller from "../controllers/users.controllers.js";

const router = express.Router();

/* Declaración de rutas para esta entidad '/users' - El archivo 'routes' sólo se encarga de declarar
las rutas de la entidad, no de cómo estas funcionan. */
router.get("/users", () => controller.getUsers);
router.get("/users/:id", () => controller.getUserByID);
router.post("/users", () => controller.createUser);
router.put("/users/:id", () => controller.updateUserByID);
router.delete("/users:id", () => controller.deleteUserByID);

// Exportando el 'router' como módulo, para ser utilizado dentro de otros módulos del proyecto
export default router;
