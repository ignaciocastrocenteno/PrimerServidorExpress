export default class UsersModelsMemory {
  constructor() {}

  getUsers = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = response.json();

    return data;
  };

  getUsersByID = async (id) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    const data = response.json();

    return data;
  };

  createUser = async (userToAdd) => {
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

  updateUserByID = async (productToUpdate, id) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(productToUpdate),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    const data = await response.json();

    return data;
  };

  modifyUserByID = async (productToUpdate, id) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify(productToUpdate),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );

    const data = await response.json();

    return data;
  };

  removeUserByID = async (id) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      {
        method: "DELETE",
      }
    );
    const result = await response.json();

    return result;
  };
}
