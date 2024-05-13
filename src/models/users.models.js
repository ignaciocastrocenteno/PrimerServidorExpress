// En la última capa 'models', se maneja la lógica de negocio y es el lugar donde se encuentra la información buscada.
// Aquí se encuentra el acceso hacia las bases de datos o la consulta hacia APIs externas

const getUsers = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();

  return data;
};

const getUserByID = async (id) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/:${id}`
  );
  const data = await response.json();

  return data;
};

const createUser = async () => {};

const updateUserByID = async () => {};

const deleteUserByID = async () => {};

// Exportamos todos las funciones que serán invocadas desde 'services', entregando la información solicitada
export default {
  getUsers,
  getUserByID,
  createUser,
  updateUserByID,
  deleteUserByID,
};
