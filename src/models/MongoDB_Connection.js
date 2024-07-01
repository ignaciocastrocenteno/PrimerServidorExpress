/* INTRODUCCIÓN A MONGODB:
        MongoDB es una base de datos no relacional, que utiliza documentos JSON para almacenar la información, en lugar
        de utilizar el tradicional esquema de tablas que propone el paradigma relacional. Estos documentos JSON son posteriomente
        guardados en colecciones de datos, con el objetivo de segmentar la información. A su vez, cada DB puede tener muchas
        colecciones dentro de sí.
   
   VENTAJAS DE MONGODB:
        - Las consultas a este tipo de base de datos no relaciones son veloces, ya que se utilizan documentos JSON
          para guardar la información.
        - Utilizar el lenguaje de programación JS para interactuar con la DB: La ventaja más importante de usar MongoDB es que
        podemos utilizar JS para acceder a toda la información guardada en sus bases de datos, sin la necesidad de utilizar SQL
        para realizar las consultas. Podemos operar dichos documentos JSON como objetos nativos de JS, haciendo uso de la
        serialización/deserialización de la información, para realizar operaciones CRUD, entre otras.

        - Mantiene en mayor medida su eficiencia y complejidad a lo largo del tiempo: Esto significa que, al escalar nuestra 
        aplicación web y incrementar el volumen de datos de nuestro sistema, no se ven grandes cambios de performance. 
        Sin embargo, no sucede lo mismo con las bases de datos relacionales, las cuales son más suptibles a deteriorar su
        rendimiento, al ser expuestas a un volumen de datos muy grande. Ya que, al estar todos los datos relacionados de alguna,
        esto impide que las operaciones sean más rápidas, teniendo que verificar y seguir las restricciones de integridad
        establecidas por el motor de base de datos relacional elegido. El motor de base de datos relacional tiene que seguir
        todas las relaciones, antes de poder retornar la información solicitada. Esto último puede representar una ventaja,
        si lo que buscamos es que no exista redundancia de datos.

   DESVENTAJAS DE MONGODB:
        - Rendundancia de datos: en algunas situaciones, no queremos que el mismo dato esté persistido más de una vez sobre
        la DB.

   ESCALAMIENTO VERTICAL vs. ESCALAMIENTO HORIZONTAL
        - El escalamiento vertical refiere a la adición de mayor potencia de cómputo sobre un servidor de la clase que sea,
        para que pueda tener un rendimiento mayor y pueda reducir el su tiempo de respuesta, ante las peticiones de los
        usuarios. Este tipo de arquitectura suele ser más económico, ya que las mejoras se realizan sobre equipos ya
        adquiridos por la empresa.

        - Por otro lado, el escalamiento horizontal, refiere a agregar nuevos servidores (también conocidos como clústers) a
        la arquitectura de nuestra aplicación web. De este modo, el sistema puede soportar más conexiónes al mismo tiempo,
        además de que cada nuevo servidor cuenta con sus propios recursos de hardware para poder solventar sus peticiones.
        Este tipo de arquitectura es más costoso que el escalamiento vertical, porque se aumenta la cantidad de clústers
        que tienen que recibir mantenimiento dentro del sistema.

        - Conceptos de 'Standard Server' (prestaciones de fábrica con el viene cada servidor) y 'Super Server' (un servidor
        al cual se le fueron incrementando sus prestaciones a través de actualizaciones de hardware específicas - discos SSD,
        más memoria RAM, incrementar potencia y/o cantidad de CPUs y 'threads' disponibles.)

   INSTALACIÓN DE MONGODB:
        - Se puede programar que se ejecute un servicio que ejecute MongoDB, cada vez que Windows sea reiniciado. Esto nos
        ahorraría tiempo, al no tener que ejecutar manualmente la base de datos por nuestra cuenta.
        - ¿Qué es Mongo Compass? - Mongo Compass es el 'Database Management System (DBMS)' oficial que propone MongoDB.
        Facilita la gestión de la base de datos, todo por medio de una interfaz de usuario amigable. No es obliagtorio su
        uso; MongoDB se puede usar directamente desde la terminal, mediante el uso de Mongo Shell.

   MONGODB COMO BASE DE DATOS LOCAL:
        1) Vamos a crear dentro de nuestro proyecto con NodeJS y Express, un directorio con el nombre 'base' (podría llamarse
        de otra manera). Aquí se guardará toda la información se vaya generando dentro de nuestra aplicación web, de modo que
        la información quede persistida y no se pierda, en caso que la aplicación deje de ser ejecutada o sea interrumpida.

        2) Antes de implementar dentro de la DAO el 'model' correspondiente a MongoDB, lo mejor es probar que la API ya esté
        funcionando sin problemas. Esto último para evitar problemas mayores a futuro.

        3) Utilizamos el comando <mongod --dbpath="./base"> dentro de una terminal CMD o PowerShell para levantar el motor
        de base de datos desde la terminal. Cabe destacar que esta instrucción tiene que ser ejecutada sobre el directorio
        anterior al directorio donde se encuentra la carpeta 'base'. Es decir, si la carpeta 'base' está dentro
        de un proyecto, tendremos que ir a la ruta donde está la carpeta raíz del proyecto. Finalmente, la recomendación
        para ejecutar el comando mencionado anteriormente, es que el mismo se ejecute sobre una terminal por fuera de
        VSCode.
        De esta manera, para interactuar con la base de datos de MongoDB, necesitaremos entonces de 2 terminales: la
        primera, solamente para inicializar el motor y definir dónde serán almacenados los datos a generar (si importa
        dónde está ubicada la terminal para ejecutarse y la misma requiere privilegios de administrador); la segunda, 
        será la terminal sobre la cual ejecutaremos los comandos de Mongo Shell, para gestionar la diferentes DBs que
        puedan existir dentro de la aplicación web. Deberemos ejecutar el comando <mongosh> sobre dicha terminal
        (puede ser abierta en cualquier punto a nivel Windows, es indistintos al momento de su ejecución). Cuando
        necesitemos salir de la Mongo Shell, hacemos lo mismo que con la shell de NodeJS: 'CTRL+C, CTRL+C' o 'CTRL+D'

        4) Configurar las 'variables de sistema' dentro de Windows - Este es un paso fundamenta, ya que de lo contrario es
        posible que no podamos utilizar el motor de base de datos correctamente.

        5) Una vez ya instalamos MongoDB y Mongo Shell sobre Windows, además de haber agragado la variable de entorno
        correspondiente, estamos ya en condiciones de crear nuestra base de datos con sus respectivas colecciones y
        documentos JSON, para almacenar información.

    COMANDOS PARA INTERACTUAR CON DBs MongoDB:
        - db: Nos permite saber con qué base de datos estamos trabajando actualmente.
        - show dbs: Nos permiten conocer todas las bases de datos disponibles en el sistema. Aquí sólo veremos
          reflejadas aquellas bases de datos que ya contienen información (es decir, hay al menos una collección
          disponible). Si existiese una base de datos que no tiene información almacenada aún, podremos accederla de
          igual manera pero no la veremos reflejada con este comando.
        - use <nombreDeLaDB>: Este comando nos permitirá utilizar la base de datos con el mismo nombre, siempre que
          exista previamente en el sistema. Caso contrario, al utilizar esta instrucción, se creará una nueva base de
          datos vacía con el nombre especificado. Una vez ya creada la nueva DB, el sistema nos parará sobre la misma.
        - db.dropDatabase(): Este comando permite eliminar permanentemente del sistema una base de datos, incluyendo:
          su estructura, colecciones, documentos JSON e índices asociados. Utilizarla con precaución, porque esta acción
          no puede ser deshecha. Para hacerlo, deberemos dirigirnos hacia la DB que deseamos borrar. Una vez parados allí,
          ejecutamos el comando mencionado.
        - db.<nombreDeLaColecciónACrear>(): Este comando equivaldría a la creación de una tabla dentro de una base de
          datos relacional, pero en este caso estaremos creando algo llamado 'colección', que será un conjunto más grande
          que contendrá todos los documentos JSON con información.
        - db.createCollection(<"nombreDeLaColeccion">): Otra forma más de expresar la operación de creación de colecciones.
        - db.<nombreDeLaColecciónABorrar>.drop(): Este comando eliminará permanentemente la colección con el nombre
          puntualizado, incluyendo a todos los documentos JSON existentes. Utilizarlo con precaución.
        - db.<nombreDeLaColecciónAModificar>.remove({}): Este comando podrá remover uno o más documentos JSON, en base
          a un criterio dado. Esta opción únicamente eliminará los JSON afectados, pero la colección mantendrá su
          estrcutura.
        - show collections: Este comando permite visualizar todas las colecciones existentes, sobre la base de datos
          con la que estamos trabajando actualmente.
        - db.<nombreDeLaColeccion>.insertOne({}): Este comando nos permite insertar un nuevo documento JSON dentro de la
          colección que estamos especificando, sobre la DB actual. Cada uno de los nuevos documentos JSON serían
          equivalentes a cada nuevo registro dentro de una tabla relacional.

   ¿CÓMO SE GUARDAN LOS DATOS? - ESQUEMA RELACIONAL vs. ESQUEMA NO-RELACIONAL
        - Relacional: DB ---> Tablas ---> Registros
        - No-relacional: DB ---> Colecciones ---> Documentos JSON

   CONCLUSIÓN:
        - Por cada entidad que necesitemos crear dentro de la REST API, deberíamos crear su colección correspondiente.
        - Por último, cabe destacar que no existe un paradigma de base de datos que sea mejor que otro, sino que ambos son
          muy útiles dependiendo de la situación de uso. Porque cada uno de ellos cuenta con ventajas y desventajas al
          momento de ser implementadas en nuestro proyectos. Existirán momentos donde querramos usar una por sobre la otra.
*/
