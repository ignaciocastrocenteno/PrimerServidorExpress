// Acá se gestionan todos los bloques try/catch, ante eventuales errores
/* Importamos todos los servicios requeridos por cada uno de los controladores, para lograr que cumplan con sus
objetivos: retornar la información solicitada por el usuario en cada caso. */
// import services from "../services/users.services.js";
import UserServices from "../services/user.services.js";

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

  checkEmptyObject = (user) => Object.keys(user).length === 0;

  getUsers = async (req, res) => {
    try {
      const users = await this.#services.getUsers();

      const date = new Date();
      const RESULT_OUTPUT = `All users have been loaded from the database available from ${date.toUTCString()}`;
      /* res
        .status(200)
        .send({statusCode: 200, message: RESULT_OUTPUT, result: users});
      */

      // Enviamos solamente el archivo JSON con los usuarios, ya que de otra manera se pierde el formato
      res.status(200).send(users);
    } catch (error) {
      console.log(`   ---> Server Error: [${error}]`);
      res
        .status(400)
        .send(
          "<!DOCTYPE html><html><title>400 Bad Request</title><body><h1>The operation could not been handled by the server. Try again!</h1></body></html>"
        );
    }
  };

  getUserByID = async (req, res) => {
    try {
      // El objeto 'req' contiene mucha información dentro de sí; acá sólo nos interesa el ID del usuario buscado
      const {id} = req.params;
      const userFound = await this.#services.getUserByID(id);

      if (!userFound) {
        throw new Error(
          "The specified user ID is incorrect, missing or has been deleted in the past"
        );
      }

      res.status(200).send(userFound);
    } catch (error) {
      console.log(`   ---> Server Error: [${error}]`);
      res
        .status(404)
        .send(
          "<!DOCTYPE html><html><title>404 Not Found</title><body><h1>Page Not Found</h1></body></html>"
        );
    }
  };

  createUser = async (req, res) => {
    try {
      /**
       * En este caso, no es necesario 'desestructurar' el objeto, ya que todas las propiedades enviadas,
       * están directamente dentro del 'body'. Si tuviésemos más propiedades u otros objetos
       * incrustados, deberíamos accederlos por medio de sus nombres.
       */
      const userToAdd = req.body;

      /**
       * Debemos filtrar los errores de mayor magnitud desde el controlador, de modo de terminar lo antes posible la
       * ejecución, en caso de que el input no sea el esperado. Para errores menores o con mayor nivel granularidad, pueden
       * ser gestionados desde la capa 'services' o directamente sobre el motor de base de datos
       * (utilizando SPs - en DBs SQL - o patrones de validación - en DBs No-SQL). Por ejemplo, 'Mongoose' es un
       * Object-Document Mapper (ODM) - similar a un ORM pero destinado a bases no relacionales, que nos permite trabajar con
       * la validación de datos sobre bases MongoDB. Para bases SQL, se podría utilizar SQLize u otras alternativas.
       *
       * Caso ideal: validar todo lo posible desde el Front-End, pero siempre hacer también las validaciones del Back-End.
       * Yendo desde lo más general a lo más puntual. Asimismo, si utilizamos librerías de validación de datos, deben ser
       * implementadas sobre la capa 'controller'.
       */

      // Acá validamos que el objeto enviado por el usuario no esté vacío
      if (this.checkEmptyObject(userToAdd)) {
        throw new Error("An empty user object cannot be processed");
      }

      const createdUser = await this.#services.createUser(userToAdd);
      const RESULT_OUTPUT =
        "A new user has been created successfully in the database";
      console.log(RESULT_OUTPUT);
      /*
      res
        .status(201)
        .send({statusCode: 201, message: RESULT_OUTPUT, result: createdUser});
      */

      res.status(201).send(createdUser);
    } catch (error) {
      console.log("The creation of the new user could not be completed");
      console.log(`   ---> Server Error: [${error}]`);
      res
        .status(406)
        .send(
          "<!DOCTYPE html><html><title>406 Not Acceptable</title><body><h1>The received content is not acceptable!</h1></body></html>"
        );
    }
  };

  updateUserByID = async (req, res) => {
    try {
      const userToUpdate = req.body;
      const {id} = req.params;
      const result = await this.#services.updateUserByID(userToUpdate, id);

      if (this.checkEmptyObject(userToUpdate)) {
        throw new Error("An empty user object cannot be processed");
      }

      const RESULT_OUTPUT =
        "The user has been updated (PUT method) correctly upon the database";
      res
        .status(200)
        .send({statusCode: 200, message: RESULT_OUTPUT, result: result});
    } catch (error) {
      console.log(`   ---> Server Error: [${error}]`);
      res
        .status(409)
        .send(
          "<!DOCTYPE html><html><title>409 Conflict</title><body><h1>There has been a conflict related to the request on the server!</h1></body></html>"
        );
    }
  };

  modifyUserByID = async (req, res) => {
    try {
      const userToModify = req.body;
      const {id} = req.params;
      const result = await this.#services.modifyUserByID(userToModify, id);

      if (this.checkEmptyObject(userToModify)) {
        throw new Error("An empty user object cannot be processed");
      }

      const RESULT_OUTPUT =
        "The user has been modified (PATCH method) correctly based on the given information";
      res
        .status(200)
        .send({statusCode: 200, message: RESULT_OUTPUT, result: result});
    } catch (error) {
      console.log(`   ---> Server Error: [${error}]`);
      res
        .status(409)
        .send(
          `<!DOCTYPE html><html><title>409 Conflict</title><body><h1>${error}</h1></body></html>`
        );
    }
  };

  removeUserByID = async (req, res) => {
    try {
      const {id} = req.params;
      const result = await this.#services.removeUserByID(id);
      const RESULT_OUTPUT =
        "The user has been removed successfully from the database";

      res
        .status(200)
        .send({statusCode: 200, message: RESULT_OUTPUT, result: result});
    } catch (error) {
      console.log(`   ---> Server Error: [${error}]`);
      res
        .status(409)
        .send(
          `<!DOCTYPE html><html><title>409 Conflict</title><body><h1>${error}</h1></body></html>`
        );
    }
  };
}
