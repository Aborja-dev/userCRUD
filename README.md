# Proyecto: Servidor Backend para Gestión de Usuarios

## Descripción General

Este proyecto es un servidor backend diseñado para gestionar los usuarios de una aplicación web. El servidor ofrece funcionalidades CRUD (Crear, Leer, Actualizar, Eliminar) y maneja dos tipos de usuarios: `user` y `admin`. Además, cuenta con un sistema de autenticación y autorización que utiliza `jsonwebtoken` para validar las sesiones de los usuarios y restringir las acciones disponibles según el rol asignado.

El servidor está construido utilizando la **Clean Architecture**, lo que facilita la integración y acoplamiento con otros módulos o servicios en aplicaciones web más amplias.

## Funcionalidades Principales

- **Gestión de Usuarios:** Permite crear, leer, actualizar y eliminar usuarios.
- **Roles de Usuario:** Manejo de roles de usuario `user` y `admin` con diferentes permisos.
- **Autenticación:** Integración con `jsonwebtoken` para la validación segura de usuarios.
- **Autorización:** Restricción de funcionalidades según el rol del usuario.

## Requisitos Previos

- **Node.js** versión `16` o superior
- **Base de datos** (e.g., MongoDB, PostgreSQL) configurada y en funcionamiento
- **npm** o **yarn** para la gestión de paquetes

Aquí tienes el contenido en formato Markdown:

```markdown
### Requisitos Previos

- **Node.js**: Se requiere tener Node.js instalado, preferiblemente versión `14.x` o superior.
- **npm** o **yarn**: Gestor de paquetes para instalar las dependencias del proyecto.
- **Prisma CLI**: Para gestionar las migraciones y el esquema de la base de datos.
- **SQLite**: La base de datos por defecto es SQLite, no se requiere configuración adicional para la instalación, pero si decides usar otra base de datos, deberás configurarla adecuadamente.

### Configuración del Entorno de Desarrollo

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/Aborja-dev/userCRUD.git
   cd userCRUD
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   # o
   yarn install
   ```

3. **Configura el archivo `.env`:**
   - Copia el archivo de ejemplo `.env.example` a `.env`:
     ```bash
     cp .env.example .env
     ```
   - Edita el archivo `.env` para personalizarlo con tus propias variables de entorno. Ejemplo:
     ```env
     DATABASE_URL="file:./dev.db"
     JWT_SECRET="tu_secreto_jwt"
     PORT=3000
     ```

### Pasos para Instalar y Configurar el Servidor Localmente

1. **Realiza las migraciones de la base de datos:**
   ```bash
   npx prisma migrate dev --name init
   ```
   Esto configurará la base de datos con las tablas necesarias.

2. **Inicia el servidor en modo desarrollo:**
   ```bash
   npm run dev
   # o
   yarn dev
   ```

3. **Accede al servidor:**
   - El servidor se ejecutará en `http://localhost:3000` (o en el puerto que hayas configurado en el archivo `.env`).

### Archivos de Configuración

- **.env**: Este archivo contiene las configuraciones sensibles como el secreto JWT, la URL de la base de datos, y otros parámetros de configuración. Debe ser personalizado con tus propios valores antes de ejecutar el proyecto.

- **config.json**: (si aplica) Si utilizas un archivo `config.json`, también deberás asegurarte de que contiene las configuraciones correctas para tu entorno (desarrollo, producción, etc.).
```
```
Este formato está listo para ser incluido en tu README y proporciona instrucciones claras sobre cómo configurar el entorno de desarrollo y ejecutar el servidor localmente. Si tienes más ajustes que hacer, estaré encantado de ayudarte.
## Estructura del Proyecto

### Tecnologías y Lenguajes de Programación
Este proyecto está desarrollado en **TypeScript** y utiliza **Express** como framework para manejar las solicitudes HTTP. Para la gestión de la base de datos, emplea **Prisma ORM** con una base de datos **SQLite**.

### Organización de la Estructura de Carpetas

- **src/**: Directorio principal del código fuente.
  - **common/**: Contiene módulos comunes que son reutilizados en diferentes partes del proyecto.
    - **authManager/**: Subcarpeta dentro de `common` que gestiona la autenticación. Contiene el archivo `stub.ts`, un archivo de ejemplo con funciones que imitan el comportamiento
  - **emailSender/**: Maneja el envío de correos electrónicos. Actualmente contiene un archivo `stub.ts` que imita el comportamiento.
  - **model/**: Carpeta encargada de definir los modelos de datos y repositorios.
    - **repositories/**: Contiene los archivos que interactúan directamente con la base de datos, utilizando Prisma.
      - **prisma.ts**: Version del repositorio que usa prismaORM.
      - **stub.ts**: Archivo base o de ejemplo relacionado con el repositorio.
      - **types.d.ts**: Archivo para la definición de tipos TypeScript específicos del modelo.
  - **helpers.ts**: Archivo que contiene funciones auxiliares y utilidades.
  - **server/**: Contiene la lógica principal del servidor.
    - **middleware/**: Carpeta que agrupa los middlewares utilizados por el servidor.
    - **User_management/**: Carpeta que contiene la lógica específica de la gestión de usuarios.
    - **server.ts**: Archivo principal del servidor que probablemente maneja la configuración inicial y el inicio del servidor.
  - **index.ts**: Posiblemente el punto de entrada del proyecto, donde se inicializan las principales configuraciones del servidor.

### Dependencias y Librerías Externas
El proyecto utiliza varias dependencias externas clave:
- **Express**: Framework para la construcción de aplicaciones web en Node.js.
- **Prisma ORM**: ORM utilizado para la gestión y consulta de la base de datos.
- **SQLite**: Base de datos ligera, utilizada junto con Prisma.

Aquí tienes un ejemplo de cómo podrías estructurar la sección de "Uso" en el README en formato Markdown, basándote en el router y los tipos proporcionados:

```markdown
## Uso

### Endpoints Disponibles

Aquí se detallan los endpoints disponibles para interactuar con el servidor y su respectiva funcionalidad:

- **POST `/register`**: Registra un nuevo usuario.
- **POST `/login`**: Inicia sesión con un usuario registrado.
- **POST `/recover`**: Recupera la cuenta de un usuario mediante un proceso de recuperación.
- **GET `/search`**: Busca usuarios según ciertos criterios.
- **GET `/detail/:id`**: Obtiene los detalles de un usuario específico por su ID.
- **PATCH `/edit`**: Edita la información de un usuario.
- **DELETE `/:id`**: Elimina un usuario específico por su ID.
- **GET `/`**: Obtiene todos los usuarios registrados. *Requiere autenticación y permisos de administrador.*

### Gestión de Rutas de Autenticación y Autorización

- **Autenticación**: Se utiliza un middleware de autenticación (`authMiddleware`) que verifica la validez del token JWT antes de permitir el acceso a rutas protegidas.
- **Autorización**: Algunas rutas, como `GET /`, también están protegidas por un middleware de autorización (`AdminMiddleware`) que verifica si el usuario tiene permisos de administrador antes de permitir el acceso.

### Ejemplo de Petición a los Endpoints

Aquí tienes algunos ejemplos de cómo interactuar con los endpoints mediante `curl`:

- **Registrar un nuevo usuario:**
  ```bash
  curl -X POST https://tu-dominio.com/register -d '{
      "email": "usuario@ejemplo.com",
      "name": "Nombre de Usuario",
      "password": "password123",
      "phone": "123456789",
      "avatarURL": "https://example.com/avatar.jpg"
  }'
  ```

- **Iniciar sesión:**
  ```bash
  curl -X POST https://tu-dominio.com/login -d '{
      "email": "usuario@ejemplo.com",
      "password": "password123"
  }'
  ```

- **Buscar usuarios:**
  ```bash
  curl -X GET https://tu-dominio.com/search?search=Nombre
  ```

- **Editar un usuario:**
  ```bash
  curl -X PATCH https://tu-dominio.com/edit -H "Authorization: Bearer <token>" -d '{
      "id": 1,
      "role": "SELLER",
      "active": "ACTIVE"
  }'
  ```

- **Eliminar un usuario:**
  ```bash
  curl -X DELETE https://tu-dominio.com/1 -H "Authorization: Bearer <token>"
  ```

### Limitaciones y Consideraciones Especiales

- **Estados de Usuario**: Los usuarios pueden tener diferentes estados (`INACTIVE`, `ACTIVE`, `SUSPENDED`), los cuales afectan su capacidad para interactuar con el sistema.
- **Seguridad**: Es obligatorio el uso de tokens JWT para acceder a rutas protegidas, y se recomienda implementar políticas de seguridad adicionales, como la validación de entradas y la encriptación de datos sensibles.
- **Acceso Administrativo**: Algunas rutas están restringidas a usuarios con permisos de administrador, asegurando que solo personal autorizado pueda realizar ciertas operaciones críticas.

Aquí te proporciono cómo podrías integrar las secciones de "Contribución" y "Licencia y Créditos" en tu README en formato Markdown:


## Contribución

¡Gracias por considerar contribuir a este proyecto! A continuación, se describen los pasos para colaborar:

1. **Fork del Repositorio**: Realiza un fork del repositorio para obtener tu propia copia del proyecto.
2. **Crea una Rama**: Crea una nueva rama para tu funcionalidad o corrección de errores.
   ```bash
   git checkout -b nombre-de-la-rama
   ```
3. **Realiza tus Cambios**: Haz los cambios en tu rama y realiza commits significativos.
   ```bash
   git commit -m "Descripción de los cambios"
   ```
4. **Empuja la Rama**: Sube tus cambios a tu fork en GitHub.
   ```bash
   git push origin nombre-de-la-rama
   ```
5. **Crea un Pull Request**: Envía un pull request desde tu rama hacia el repositorio original, proporcionando una descripción clara de los cambios realizados.

### Guías de Estilo y Convenciones

- Sigue las guías de estilo de código utilizadas en el proyecto.
- Asegúrate de que tu código está bien documentado y sigue las convenciones de nombres utilizadas en el proyecto.
- Verifica que todos los tests pasen antes de enviar tu pull request.

## Licencia y Créditos

Este proyecto está licenciado bajo la **MIT License**. Puedes consultar el archivo [LICENSE](LICENSE) para más detalles.

### Créditos

Este proyecto fue desarrollado como parte de un esfuerzo para proporcionar una solución modular y escalable para la gestión de usuarios en aplicaciones web. Siéntete libre de usar, modificar y mejorar este código, pero por favor da el debido crédito a los autores originales.

---

¡Gracias por tu interés en este proyecto! Cualquier contribución es bienvenida y muy apreciada.
