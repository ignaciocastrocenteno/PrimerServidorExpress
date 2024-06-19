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
  #idCounter;
  #users;
  constructor() {
    this.#idCounter = 0;
    this.#users = [
      {
        id: 0,
        nombre: "SYS_ADMIN",
      },
      /* {
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
      */
    ];
  }
  /**
   * Este método retorna un vector, conteniendo todos los usuarios existentes dentro de la memoria del servidor.
   * @returns Todos los usuarios disponibles del servidor.
   */
  getUsers = async () => {
    return this.#users;
  };

  /**
   * Este método busca a un usuario determinado dentro de la memoria del servidor, en base al ID que envió el
   * usuario. Si no existe un usuario con el ID especificado, se retornará un código HTTP 404 - Not Found
   * @param {number} id El ID del usuario buscado, que se recibe vía el endpoint {{id}}. El ID es un número entero mayor
   * a cero.
   * @returns {object} El usuario con el ID buscado (si existe).
   */
  getUserByID = async (id) => {
    const userFound = this.#users.find((user) => user.id == id);

    return userFound;
  };

  /**
   * Este método permite crear a un usuario dentro de la memoria del servidor. Cada nuevo usuario generado, recibirá
   * un UniqueIdentifier (ID), el cual identificará unívocamente al objeto, respecto de los demás objetos guardados en el
   * servidor. Los IDs generados no se repiten, aunque sus objetos de origen dejen de existir en memoria.
   * @param {object} userToAdd El usuario a ser almacenado en la memoria del servidor. Es un objeto que contiene toda la
   * información relacionada con dicho usuario.
   * @returns {object} La información ingresada por el usuario, para ser persistida (sólo si no hay errores)
   */
  createUser = async (userToAdd) => {
    /* 
    // Aunque el método '.push()' sea sincrónico, colocamos la keyword 'await', en caso de tener mucha
    // información para gestionar en memoria. Si demora más de lo usual, JS esperará hasta que se complete la operación.
    const data = await this.users.push(userToAdd);
    return data; 
    */

    const user = userToAdd;

    // Autogeneramos el ID de cada nueva instancia de usuario a ser almacenada
    user["id"] = ++this.#idCounter;
    // Se agrega a la memoria del servidor el nuevo usuario, ya con su ID
    this.#users.push(user);

    return userToAdd;
  };

  /**
   * Este método permite actualizar completamente la información de un usuario, que ya existía previamente
   * en la memoria del servidor. La información anterior, será reemplazada por la información facilitada por el usuario.
   * @param {object} userToUpdate La nueva información relacionada a dicho usuario, la cual será persistida en memoria una vez
   * finalizada la ejecución de este método.
   * @param {number} id De tipo numérico (entero), será el ID utilizado para realizar la búsqueda de la información existente
   * del usuario en memoria.
   * @returns {object} El usuario ya actualizado con la nueva información, recibida como argumento.
   * @throws {Error} En caso de que el usuario que se busca actualizar, no exista dentro de la memoria del servidor.
   */
  updateUserByID = async (userToUpdate, id) => {
    // Se busca el ID del usuario, dentro del array de usuarios. Si se encuentra se retorna el ID, sino retorna -1
    const userIndex = this.#users.findIndex((user) => user.id == id);

    // Si no existe el usuario a ser actualizado en memoria, se arroja una excepción al controlador
    if (userIndex === -1) {
      throw new Error(
        "The user to update with the specified ID does not exist!"
      );
    }

    /*
    Si el usuario para actualizar existe, accedemos a dicha posición en memoria y pisamos totalmente la referencia}
    anterior, por la nueva información que recibimos como argumento. También copiamos el ID del objeto para no perderlo.
    */
    this.#users[userIndex] = {...userToUpdate, id: parseInt(id)};

    // Retornamos la posición de memoria actualizada con la nueva información
    return this.#users[userIndex];
  };

  /**
   * Este método permite realizar una actualización parcial de la información relacionada con un usuario
   * que ya existía previamente en la memoria del servidor. La información anterior, será reemplazada parcialmente por la
   * información facilitada por el usuario, manteniendo aquellos datos que ya estaban guardados y sumando la nueva
   * información recibida como argumento.
   * @param {object} userToModify La nueva información relacionada a dicho usuario, la cual será persistida en memoria una vez
   * finalizada la ejecución de este método, en combinación con la información previa.
   * @param {number} id De tipo numérico (entero), será el ID utilizado para realizar la búsqueda de la información existente
   * del usuario en memoria.
   * @returns {object} El usuario ya actualizado con la nueva información, recibida como argumento; adicionalmente a la
   * información preexistente a la ejecución de este método.
   * @throws {Error} En caso de que el usuario que se busca modificar, no exista dentro de la memoria del servidor.
   */
  modifyUserByID = async (userToModify, id) => {
    // Se busca el ID del usuario, dentro del array de usuarios. Si se encuentra se retorna el ID, sino retorna -1
    const userIndex = this.#users.findIndex((user) => user.id == id);

    // Si no existe el usuario a ser actualizado en memoria, se arroja una excepción al controlador
    if (userIndex === -1) {
      throw new Error(
        "The user to modify with the specified ID does not exist!"
      );
    }

    /*
    Si por algún motivo, se quiere modificar el ID del objeto usuario, se arroja una excepción indicando dicha
    restricción de integridad.
    */
    if ("id" in userToModify) {
      throw new Error("The user ID can never be changed!");
    }

    /*
    Si existe el usuario con el ID buscado, realizamos una actualización parcial de la información, sumando todo lo
    que ya existía en memoria sumando la nueva información.
    */
    const currentUser = this.#users[userIndex];
    this.#users[userIndex] = {...currentUser, ...userToModify};
    let result = this.#users[userIndex];

    // Retornamos la posición de memoria actualizada con la nueva información
    return result;
  };

  /**
   * Este método permite remover un usuario, que existía previamente en la memoria del servidor, utilizando un ID
   * recibido como argumento para su búsqueda.
   * @param {number} id De tipo numérico (entero), será el ID utilizado para realizar la búsqueda del usuario en memoria
   * para, posteriormente, poder eliminarlo de la misma.
   * @returns {boolean}
   *  - `true` Si el objeto de tipo usuario con el ID especificado, logró se removido de la memoria del servidor
   * exitosamente.
   *  - `false` Si no se logró remover exitosamente de la memoria al usuario buscado, a razón de algún error o excepción.
   * @throws {Error} En caso de que el usuario que se busca eliminar, no exista dentro de la memoria del servidor.
   */
  removeUserByID = async (id) => {
    const userIndex = this.#users.findIndex((user) => user.id == id);

    if (userIndex === -1) {
      throw new Error(
        "The user to remove with the specified ID does not exist!"
      );
    }

    /*
    Ya no es necesario especificar explícitamente que no agregaremos nuevo contenido, utilizando el número cero como
    tercer parámetro dentro del método .splice(), como sí era el caso de versiones anteriores de JS.
    */
    this.#users.splice(userIndex, 1);

    return true;
  };
}
