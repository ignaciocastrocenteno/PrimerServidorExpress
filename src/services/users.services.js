// Esta capa 'services' es más que nada un "pasamanos": no maneja requerimientos ni lógica de negocio
// Importamos los modelos que vamos a necesitar para responderle a cada controlador
import models from "../models/users.models.js";

/* En el archivo 'services', cada función (que es un servicio individual), gestiona el retorno directamente de la información
exigida por el controlador que lo invoca. */
// En este punto, ya sólo nos manejamos con funciones. Normalmente mantenemos el nombre de la función por coherencia
const getUsers = async () => {
  const users = await models.getUsers();
  return users;
};

const getUserByID = async (id) => {
  const user = await models.getUserByID(id);
  return user;
};

const createUser = async () => {};

const updateUserByID = async () => {};

const deleteUserByID = async () => {};

// Exportamos todos las funciones que serán invocadas desde 'controllers' para cumplir con los requerimientos
export default {
  getUsers,
  getUserByID,
  createUser,
  updateUserByID,
  deleteUserByID,
};
