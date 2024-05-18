// Acá se gestionan todos los bloques try/catch, ante eventuales errores
/* Importamos todos los servicios requeridos por cada uno de los controladores, para lograr que cumplan con sus
objetivos: retornar la información solicitada por el usuario en cada caso. */
// import services from "../services/users.services.js";
import UserServices from "../services/users.services.js";

/* El archivo 'controllers' es el que tiene la responsabilidad de gestionar todos los
requerimientos del usuario, haciendo uso de los objetos 'req' (requirement) y 'res' (response).*/
//REQ vía URL => por ejemplo: req.id, req.name => via URL
//REQ vía body => por ejemplo: req.body => si estamos haciendo un post/put/patch/delete, donde envíamos info.

/* const getUsers = async (req, res) => {
  try {
    const users = await services.getUsers();
    res.send(users);
  } catch (error) {
    console.log("There was an error while obtening all users data");
    console.log(`Server Error: [${error}]`);
    res
      .status(400)
      .send(
        "<!DOCTYPE html><html><title>400 Bad Request</title><body><h1>Page Not Found</h1></body></html>"
      );
  }
};

const getUserByID = async (req, res) => {
  try {
    // El objeto 'req' contiene mucha información dentro de sí; acá sólo nos importa el ID del usuario buscado
    const {id} = req.params;
    const user = await services.getUserByID(id);

    const isEmpty = (user) => Object.keys(user).length === 0;

    if (isEmpty(user)) {
      throw new Error(
        "The specified user ID is incorrect, missing or has been deleted in the past"
      );
    }

    res.send(user);
  } catch (error) {
    console.log(`Server Error: [${error}]`);
    res
      .status(404)
      .send(
        "<!DOCTYPE html><html><title>404 Not Found</title><body><h1>Page Not Found</h1></body></html>"
      );
  }
};

const createUser = async (req, res) => {
  try {
    const userToAdd = req.body;
    const result = await services.createUser(userToAdd);
    const RESULT_OUTPUT =
      "A new user has been created successfully in the database";
    console.log(RESULT_OUTPUT);
    res.status(200).send({message: RESULT_OUTPUT, userData: result});
  } catch (error) {
    console.log("The creation of the new user could not be completed");
    console.log(`Error: [${error}]`);
    res
      .status(406)
      .send(
        "<!DOCTYPE html><html><title>404 Not Found</title><body><h1>Page Not Found</h1></body></html>"
      );
  }
}; */

// const updateUserByID = async (req, res) => {};

// const deleteUserByID = async (req, res) => {};

// Exportamos todos las funciones que serán invocadas en 'routes' para responder la petición HTTP
/* export default {
  getUsers,
  getUserByID,
  createUser,
  // updateUserByID,
  // deleteUserByID,
}; */

// REFACTORIZACIÓN DE 'CONTROLLERS' A CLASES ES6
export default class UserControllers {
  #services;
  constructor() {
    this.#services = new UserServices();
  }

  getUsers = async (req, res) => {
    try {
      const users = await this.#services.getUsers();
      res.send(users);
    } catch (error) {
      console.log("There was an error while obtening all users data");
      console.log(`   ---> Server Error: [${error}]`);
      res
        .status(400)
        .send(
          "<!DOCTYPE html><html><title>400 Bad Request</title><body><h1>Page Not Found</h1></body></html>"
        );
    }
  };

  getUserByID = async (req, res) => {
    try {
      // El objeto 'req' contiene mucha información dentro de sí; acá sólo nos importa el ID del usuario buscado
      const {id} = req.params;
      const user = await this.#services.getUserByID(id);

      const isEmpty = (user) => Object.keys(user).length === 0;

      if (isEmpty(user)) {
        throw new Error(
          "The specified user ID is incorrect, missing or has been deleted in the past"
        );
      }

      res.send(user);
    } catch (error) {
      console.log(`Server Error: [${error}]`);
      res
        .status(404)
        .send(
          "<!DOCTYPE html><html><title>404 Not Found</title><body><h1>Page Not Found</h1></body></html>"
        );
    }
  };

  createUser = async (req, res) => {
    try {
      const userToAdd = req.body;
      const result = await this.#services.createUser(userToAdd);
      const RESULT_OUTPUT =
        "A new user has been created successfully in the database";
      console.log(RESULT_OUTPUT);
      res
        .status(200)
        .send({statusCode: 200, message: RESULT_OUTPUT, userData: result});
    } catch (error) {
      console.log("The creation of the new user could not be completed");
      console.log(`Error: [${error}]`);
      res
        .status(406)
        .send(
          "<!DOCTYPE html><html><title>404 Not Found</title><body><h1>Page Not Found</h1></body></html>"
        );
    }
  };
}
