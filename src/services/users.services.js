// Esta capa 'services' es más que nada un "pasamanos": no maneja requerimientos ni lógica de negocio
// Importamos los modelos que vamos a necesitar para responderle a cada controlador
// import UserModel from "../models/Users/users.memory.models.js";
// import UserModel from "../models/Users/users.fs.models.js";

// En lugar de cambiar manualmente la importación de 'models', hablamos con la factoría
import ModelFactory from "../models/DAO/AbstractFactory.js";
// Importamos desde 'config.js' el tipo de persistencia elegida para trabajar. Esto para que sea más escalable
import config from "../../config.js";

/* En el archivo 'services', cada función (que es un servicio individual), gestiona el retorno directamente de la información
exigida por el controlador que lo invoca. */
// En este punto, ya sólo nos manejamos con funciones. Normalmente mantenemos el nombre de la función por coherencia

/* const getUsers = async () => {
  const users = await models.getUsers();
  return users;
};

const getUserByID = async (id) => {
  const user = await models.getUserByID(id);
  return user;
};

const createUser = async (userToAdd) => {
  const result = await models.createUser(userToAdd);
  return result;
};

// const updateUserByID = async () => {};

// const deleteUserByID = async () => {}; */

// Exportamos todos las funciones que serán invocadas desde 'controllers' para cumplir con los requerimientos
/* export default {
  getUsers,
  getUserByID,
  createUser,
  // updateUserByID,
  // deleteUserByID,
}; */

// REFACTORIZACIÓN DE 'SERVICES' A CLASES ES6
export default class UserServices {
  #models;
  constructor() {
    // Instanciamos los modelos de la entidad '/users' para utilizar sus métodos, de acuerdo al tipo de persistencia elegida
    this.#models = ModelFactory.get(config.PERSISTENCE_TYPE);
  }

  getUsers = async () => {
    const users = await this.#models.getUsers();
    return users;
  };

  getUserByID = async (id) => {
    const user = await this.#models.getUsersByID(id);
    return user;
  };

  createUser = async (userToAdd) => {
    const result = await this.#models.createUser(userToAdd);
    return result;
  };

  // updateUserByID = async () => {};

  // deleteUserByID = async () => {};
}
