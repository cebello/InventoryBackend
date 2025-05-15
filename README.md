# InventoryBackend

Backend desarrollado con Node.js y Express para la gestión de un modelo de negocio de inventarios, utilizando SQLite como base de datos.

## Descripción

Este proyecto proporciona la lógica de servidor y la API necesaria para [Describe brevemente el propósito principal del sistema de inventarios, por ejemplo: "registrar productos, gestionar stock, realizar seguimiento de entradas y salidas", etc.].

## Tecnologías Utilizadas

*   **Node.js:** Entorno de ejecución para JavaScript del lado del servidor.
*   **Express.js:** Framework web minimalista y flexible para Node.js, utilizado para construir la API.
*   **SQLite:** Motor de base de datos relacional ligero basado en archivos.

## Prerrequisitos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

*   [Node.js](https://nodejs.org/) (se recomienda la versión LTS)
*   [npm](https://www.npmjs.com/) (generalmente viene con Node.js) o [Yarn](https://yarnpkg.com/)

## Instalación

1.  Clona el repositorio:
    ```bash
    git clone https://[URL-DE-TU-REPOSITORIO].git
    cd InventoryBackend
    ```
2.  Instala las dependencias del proyecto:
    ```bash
    npm install
    ```
    O si usas Yarn:
    ```bash
    yarn install
    ```

## Ejecución

Para iniciar el servidor en modo de desarrollo, ejecuta:

```bash
npm start
```
O el comando que tengas configurado en tu `package.json` para iniciar la aplicación (por ejemplo, `npm run dev`).

La API estará disponible en `http://localhost:[PUERTO]` (reemplaza `[PUERTO]` con el puerto que hayas configurado, comúnmente 3000 o 5000).

## Endpoints de la API de Inventario (`/inventory`)

Todas las rutas bajo `/inventory` requieren autenticación. Se debe enviar un Token JWT en la cabecera `Authorization` con el formato `Bearer <token>`.

Si el token no se proporciona o es inválido, la API responderá con un estado `401 Unauthorized` y un mensaje de error como:
```json
{ "error": "Token requerido" }
```

*   `GET /inventory/:id`: Obtiene un producto específico por su ID.
*   `POST /inventory/`: Agrega un nuevo producto al inventario.
*   `PUT /inventory/:id`: Edita/Actualiza un producto existente por su ID.
*   `DELETE /inventory/:id`: Elimina un producto del inventario por su ID.

## Endpoints de la API de Autenticación (`/auth`)

Estas rutas se utilizan para la autenticación de usuarios y el registro de nuevas cuentas.

---

### 1. Inicio de Sesión (Login)

*   **Método:** `POST`
*   **Ruta:** `/auth/login`
*   **Descripción:** Autentica a un usuario existente y devuelve un Token JWT si las credenciales son válidas.
*   **Autenticación Requerida:** No.
*   **Cuerpo de la Solicitud (JSON):**
    ```json
    {
      "email": "usuario@ejemplo.com",
      "password": "tucontraseña"
    }
    ```
*   **Respuestas:**
    *   **`200 OK`**: Éxito. Devuelve un token JWT y la información básica del usuario.
        ```json
        {
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwY...", // Token JWT
          "user": {
            "id": "60c72b2f9b1e8a5f88a4a0a1", // ID del usuario
            "name": "Nombre Usuario",
            "email": "usuario@ejemplo.com"
          }
        }
        ```
    *   **`401 Unauthorized`**: Si la contraseña es incorrecta.
        ```json
        { "error": "Contraseña incorrecta" }
        ```
    *   **`404 Not Found`**: Si el usuario con el correo electrónico proporcionado no existe.
        ```json
        { "error": "Usuario no encontrado" }
        ```
    *   **`500 Internal Server Error`**: Si ocurre un error al consultar la base de datos o durante el proceso de autenticación.
        ```json
        { "error": "Mensaje detallado del error del servidor" }
        ```

---

### 2. Registro de Nuevo Usuario

*   **Método:** `POST`
*   **Ruta:** `/auth/register`
*   **Descripción:** Crea una nueva cuenta de usuario.
*   **Autenticación Requerida:** No.
*   **Cuerpo de la Solicitud (JSON):**
    ```json
    {
      "name": "Nuevo Usuario",
      "email": "nuevo@ejemplo.com",
      "password": "contraseñasegura"
    }
    ```
*   **Respuestas:**
    *   **`201 Created`**: Éxito. Devuelve el objeto del usuario recién creado (sin la contraseña).
        ```json
        {
          "id": "60c72b3a9b1e8a5f88a4a0a2", // ID asignado por la base de datos
          "name": "Nuevo Usuario",
          "email": "nuevo@ejemplo.com"
          // ...otros campos del usuario (excepto la contraseña)
        }
        ```
    *   **`500 Internal Server Error`**: Si ocurre un error durante la creación del usuario (ej. correo ya existente, error de base de datos, error al hashear la contraseña).
        ```json
        { "error": "Mensaje detallado del error del servidor" }
        ```

---
