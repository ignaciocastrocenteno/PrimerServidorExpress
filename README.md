# Trabajo Práctico N°2 - Creación de una REST API con Express

## Información del proyecto

### - _Alumno: Ignacio Castro Centeno_

### - _Materia: Taller de Programación II (TP2)_

### - _Profesora: Débora Rolón_

### - _Fecha de finalización: 13/05/2024_

### - _Fecha de entrega: 15/05/2024_

## Aclaraciones

- Modifiqué el formato de codificación del archivo 'package.json' de LF a CRLF. Esto para evitar posibles incompatibilidades entre los diferentes sistemas operativos, al momento de trabajar con el archivo.
- Agregué un archivo '.gitignore' para cumplir con las buenas prácticas, evitando subir los siguientes elementos: la carpeta 'node_modules'; el archivo 'package-lock.json'; todos los archivos temporales o de logs (para evitar 'bloating'); y los archivos '.env' con información eventualmente información sensible (API keys, variables de entorno, secretos, contraseñas, etc.)
- Se implementó el patrón de diseño estructural _MVC (Model-View-Controller)_ dentro del proyecto, disponiendo de las carpetas genéricas que caracterizan a esta arquitectura _('routes', 'controllers', 'services', 'models')_, todo contenido dentro de un directorio principal _'src'_.
- Si bien hay creadas varias rutas, sólo llegué a implementar 3 de ellas por la falta de tiempo. Las que llegué a implementar están en funcionamiento (consultar todos los usuarios, consultar un usuario por ID y emular la creación de un nuevo registro).
- La aplicación está lista para ser lanzada con el framework Express, luego de utilizarse el comando _npm install_ para la instalación de todas las dependencias requeridas para el funcionamiento del proyecto.
