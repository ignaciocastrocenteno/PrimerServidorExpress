// En la última capa 'models', se maneja la lógica de negocio y es el lugar donde se encuentra la información buscada.
// Aquí se encuentra el acceso hacia las bases de datos o la consulta hacia APIs externas

/* const getUsers = async () => {
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
      type: "creation-of-user",
      userData: userToAdd,
      userId: 1,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  let data = response.json();

  return data;
}; */

/* const updateUserByID = async () => {};

const deleteUserByID = async () => {}; */

// Exportamos todos las funciones que serán invocadas desde 'services', entregando la información solicitada
/* export default {
  getUsers,
  getUserByID,
  createUser,
  // updateUserByID,
  // deleteUserByID,
}; */

// REFACTORIZACIÓN DE 'MODELS' A CLASES ES6
export default class UsersModelsMemory {
  constructor() {
    /*  this.users = [
      {
        id: 1,
        nombre: "Juan Pérez",
      },
      {
        id: 2,
        nombre: "Fulano Gómez",
      },
      {
        id: 3,
        nombre: "Mengana Torres",
      },
    ]; */
  }

  getUsers = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = response.json();

    return data;
  };

  getUserByID = async (id) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    const data = response.json();

    return data;
  };

  createUser = async (userToAdd) => {
    /* 
    // Aunque el método '.push()' sea sincrónico, colocamos la keyword 'await', en caso de tener mucha
    // información para gestionar en memoria. Si demora más de lo usual, JS esperará hasta que se complete la operación.
    const data = await this.users.push(userToAdd);
    return data; 
    */

    // console.log(userToAdd);
    const response = await fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      body: JSON.stringify({
        type: "creation-of-user",
        userData: userToAdd,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    let data = await response.json();
    // console.log(data);

    return userToAdd;
  };

  // updateUserByID = async () => {};

  // deleteUserByID = async () => {};

  /* 
    //Modificación de productos completa
    app.put("/products/:id", (req, res) => {
      const {id} = req.params
      const product = req.body
      // product.id = id
      const index = products.findIndex((e) => e.id == id)
      products.splice(index, 1, product)
      res.send(product)
    })

    //TODO: Modificacion de productos parcial
    app.patch("/products/:id", (req, res) => {
      const { id } = req.params;
      const product = req.body;
      const index = products.findIndex((e) => e.id == id);
      //Spread operator
      const oldProduct = products[index];
      console.log("oldProduct: ", oldProduct);
      const newProduct = { ...oldProduct, ...product };
      console.log("newProduct: ", newProduct);
      products.splice(index, 1, newProduct);
      res.send("Ok");
    });

    //Eliminar información
    app.delete("/products/:id", (req, res) => {
      const { id } = req.params;
      const index = products.findIndex((e) => e.id == id);
      if (index === -1) throw new Error("El ID no se encuentra en la lista.");
      products.splice(index, 1);
      res.send("El elemento ha sido eliminado.");
    });
  */
}
