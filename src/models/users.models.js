// En la última capa 'models', se maneja la lógica de negocio y es el lugar donde se encuentra la información buscada.
// Aquí se encuentra el acceso hacia las bases de datos o la consulta hacia APIs externas

const getUsers = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = response.json();

  return data;
};

const getUserByID = async (id) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );
  const data = response.json();

  return data;
};

const createUser = async (userToAdd) => {
  // console.log(userToAdd);
  const response = await fetch("https://jsonplaceholder.typicode.com/users", {
    method: "POST",
    body: JSON.stringify({
      title: "foo",
      body: "bar",
      userId: 1,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  let data = response.json();

  if (data) {
    data = "A new user has been created successfully in the database";
  } else {
    data = "The user couldn't be created since there was an server error";
  }

  return data;
};

/* const updateUserByID = async () => {};

const deleteUserByID = async () => {}; */

// Exportamos todos las funciones que serán invocadas desde 'services', entregando la información solicitada
export default {
  getUsers,
  getUserByID,
  createUser,
  /*  updateUserByID,
  deleteUserByID, */
};
