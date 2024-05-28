// Recordamos que 'fs' no requiere instalación previa, ya que es una de las librería nativas de NodeJS
import fs from "fs";

export default class UsersModelsFs {
  constructor() {
    /*
      Creamos un atributo 'users' que tendrá el 'path' hacia el archivo JSON, donde se encuentra la información.
      Recordamos que, el método '.readFile()' de 'fs', irá a buscar el archivo a nivel raíz. Como el archivo se encuentra
      dentro de la carpeta 'models', tenemos que establecer la ruta absoluta.
    */
    this.users = "src/models/Users/users.json";
  }

  getUsers = async () => {
    // Accedemos al atributo 'promises' del objeto 'fs', para realizar una lectura asíncrona del archivo
    const data = await fs.promises.readFile(this.users, "utf-8");
    console.log("DATA: \n" + data);

    // Como no realizamos escritura de datos, devolvemos directamente todos los usuarios
    return data;
  };

  getUsersByID = async (id) => {
    const vanillaObj = JSON.parse(
      await fs.promises.readFile(this.users, "utf-8")
    );
    console.log(vanillaObj);
    // No usamos la comparación estricta, ya que el ID recibido viaja como 'String'
    const userFound = await vanillaObj.find((user) => user.id == id);
    console.log(userFound);
    // const usersJSON = JSON.stringify(vanillaObj);
    // console.log(usersJSON);

    // Igual que con el método 'getUsers()', al no realizar operaciones de escritura, no es obligatorio la serialización
    return userFound;
  };

  createUser = async (user) => {
    // Deserializamos el archivo 'users.json' para poder trabajar con él
    const usersArr = JSON.parse(
      await fs.promises.readFile(this.users, "utf-8")
    );
    // Agregamos el usuario dentro de la lista
    usersArr.push(user);
    // Serializamos el archivo 'user.json' para poder sobreescribir el archivo original
    const usersJSON = JSON.stringify(usersArr);
    await fs.promises.writeFile(this.users, usersJSON);

    /*
      Generalmente y por convención, siempre retornamos al usuario aquello que haya ingresado para crear el nuevo registro.
      En escenarios no productivos, es probable que nos convenga devolver la lista actualizada, para corroborar si la
      persistencia está funcionando correctamente.
    */
    return user;
  };
}
