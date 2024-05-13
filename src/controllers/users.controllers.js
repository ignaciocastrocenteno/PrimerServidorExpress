// Acá se gestionan todos los bloques try/catch, ante eventuales errores
/* Importamos todos los servicios requeridos por cada uno de los controladores, para lograr que cumplan con sus
objetivos: retornar la información solicitada por el usuario en cada caso. */
import services from "../services/users.services.js";

/* El archivo 'controllers' es el que tiene la responsabilidad de gestionar todos los
requerimientos del usuario, haciendo uso de los objetos 'req' (requirement) y 'res' (response).*/
//REQ vía URL => por ejemplo: req.id, req.name => via URL
//REQ vía body => por ejemplo: req.body => si estamos haciendo un post/put/patch/delete, donde envíamos info.
const getUsers = async (req, res) => {
  const users = await services.getUsers();
  res.send(users);
};

const getUserByID = async (req, res) => {
  // El objeto 'req' contiene mucha información dentro de sí; acá sólo nos importa el ID del usuario buscado
  const {id} = req.params;
  const user = await services.getUserByID(id);
  res.send(user);
};

const createUser = async (req, res) => {
  const userToAdd = req.body;
  const result = await services.createUser(userToAdd);
  res.send(result);
};

/* const updateUserByID = async (req, res) => {};

const deleteUserByID = async (req, res) => {}; */

// Exportamos todos las funciones que serán invocadas en 'routes' para responder la petición HTTP
export default {
  getUsers,
  getUserByID,
  createUser,
  /*   updateUserByID,
  deleteUserByID, */
};
