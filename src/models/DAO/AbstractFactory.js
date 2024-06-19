import UserMemoryModels from "../User/user.memory.models.js";
import UserThirdPartyAPIModels from "../User/user.thirdpartyAPI.models.js";
import UserFsModels from "../User/user.fs.models.js";

/* La clase 'ModelFactory' aplica el patrón de diseño DAO (Data Access Object), para gestionar los diferentes medios
de persistencia de datos que hay disponibles en la aplicación. Siempre que veamos este patrón aplicado a un
proyecto, sabemos que vamos a estar trabajando con 2 o más fuentes de datos. */

/*
  Ventajas de implementar el patrón DAO en proyectos:
    - Crear y configurar fácilmente nuevos tipos de persistencias para el proyecto; brinda mayor robutez al código, ya que
    no tenemos que refactorizar el codebase, sólo necesitamos cambiar el 'import' de cada archivo 'services', correspondiente
    a cada entidad. De ese modo, los servicios siempre van a hablar con la factoría y no con los 'models' concretos.

    - Actualización de persistencias: si el patrón está implementado dentro del proyecto y necesitamos actualizar la base de
    datos, esta tarea es mucho más sencilla. Únicamente deberíamos manipular la factoría y conectarla con el modelo
    actualizado.
*/
export default class ModelFactory {
  constructor() {}

  /* La ejecución de la factoría la hacemos 'static' para no tener que instanciar la clase. Ejecutamos el método,
  enviándole por parámetro el tipo de persistencia que vamos a utilizar (un String indicando su tipo) */
  static get(type) {
    switch (type) {
      case "MEM":
        console.log("Persistiendo en la memoria del servidor!");
        return new UserMemoryModels();
      case "THIRD_PARTY_API":
        console.log("Emulando persistencia en una REST API externa!");
        return new UserThirdPartyAPIModels();
      case "FS":
        console.log("Persistiendo sobre FileSystem (FS)");
        return new UserFsModels();
      /* case "MONGO_DB":
        console.log("Persistiendo en la memoria de MongoDB!");
        return new ProductsModelMongo();
      */

      // En caso que el input no coincida con ninguna de las persistencias disponibles, usamos la persistencia 'default'.
      default:
        console.log("Persistiendo en la memoria default (MEMORY)!");
        return new UserMemoryModels();
    }
  }
}
