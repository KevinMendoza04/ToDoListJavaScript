# 📝 Todo App — Vanilla JavaScript

Aplicación de gestión de tareas desarrollada con **JavaScript Vanilla**, consumo de API REST con `fetch`, manejo de `localStorage`, filtros con query params y arquitectura basada en vistas y controladores.

---

## 🚀 Tecnologías

| Tecnología | Versión | Uso |
|---|---|---|
| Node.js | 22.14.0 | Entorno de ejecución |
| Vite | 6.x | Bundler y dev server |
| Tailwind CSS | 4.x | Estilos utilitarios |
| json-server | 0.17.4 | Fake REST API |
| Inter (Google Fonts) | — | Tipografía |

---

## 📁 Estructura del proyecto

```
├── database/
│   └── db.json                  # Base de datos de la fake API
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/                  # Imágenes y recursos estáticos
│   ├── components/
│   │   └── layout.js            # Layout principal con sidebar y header
│   ├── controllers/
│   │   ├── home.controller.js   # Lógica de tareas (CRUD, filtros, modales)
│   │   ├── login.controller.js  # Lógica de autenticación
│   │   ├── todo.controller.js   # Funciones fetch hacia la API
│   │   └── user.controller.js   # Lógica de listado de usuarios
│   ├── views/
│   │   ├── homeView.js          # Vista de tareas con filtros y modales
│   │   ├── loginView.js         # Vista de login
│   │   ├── notFoundView.js      # Vista 404
│   │   └── userView.js          # Vista de usuarios (solo admin)
│   ├── main.js                  # Router principal (hash-based)
│   └── style.css                # Estilos globales + Tailwind
├── index.html
├── package.json
└── vite.config.js
```

---

## ⚙️ Instalación y uso

### Requisitos previos

- Node.js **v22.14.0** (usar nvm recomendado)

```bash
nvm use 22.14.0
```

### 1. Instalar dependencias

```bash
npm install
```

### 2. Iniciar la fake API (json-server)

```bash
npm run api
```

La API quedará disponible en `http://localhost:3000`

### 3. Iniciar el servidor de desarrollo

```bash
npm run dev
```

La app quedará disponible en `http://localhost:5173`

> ⚠️ Ambos servidores deben estar corriendo al mismo tiempo.

---

## 🌐 Endpoints de la API

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/users` | Obtener todos los usuarios |
| GET | `/todo_list` | Obtener todas las tareas |
| GET | `/todo_list?id_user=2` | Tareas de un usuario específico |
| POST | `/todo_list` | Crear nueva tarea |
| PUT | `/todo_list/:id` | Actualizar tarea completa |
| PATCH | `/todo_list/:id` | Actualizar campo específico |
| DELETE | `/todo_list/:id` | Eliminar tarea |

---

## 🔐 Autenticación

El login valida email y contraseña contra la API (`/users`). Al autenticarse correctamente, los datos del usuario se guardan en `localStorage` y se redirige según el rol.

**Cuentas disponibles en db.json:**

| Rol | Email | Contraseña |
|---|---|---|
| Admin | juan@mail.com | juancho |
| User | luisita@mail.com | luisita |
| User | pedrito@mail.com | pedrito |

---

## 👥 Roles y permisos

### 🔴 Admin
- Ver **todas** las tareas del sistema
- Filtrar por estado, búsqueda y usuario
- Cambiar el estado de cualquier tarea
- Eliminar cualquier tarea
- Ver el listado de usuarios registrados

### 🔵 User
- Ver **únicamente sus propias tareas**
- Crear nuevas tareas
- Editar sus propias tareas
- Filtrar por estado y búsqueda

---

## 📋 Modelo de tarea

```json
{
  "id": "1",
  "id_user": "2",
  "title": "Título de la tarea",
  "description": "Descripción opcional",
  "status": "initial"
}
```

**Estados posibles:**

| Estado | Descripción |
|---|---|
| `initial` | Tarea recién creada, sin iniciar |
| `process` | Tarea en progreso |
| `completed` | Tarea finalizada |

---

## 🔎 Filtros con Query Params

Los filtros se implementan usando query params en el hash de la URL:

```
#home?status=completed
#home?search=comer
#home?user=2
#home?status=process&search=estudiar
```

Los filtros se aplican en tiempo real sin recargar la página y se sincronizan con los inputs del panel de filtros.

---

## 🏗️ Arquitectura

La app sigue un patrón **MVC simplificado**:

- **Views** — funciones que retornan HTML como string (sin framework)
- **Controllers** — manejan la lógica, eventos del DOM y llamadas a la API
- **Router** — basado en `window.location.hash` con soporte de query params
- **Layout** — componente reutilizable que envuelve las vistas protegidas

El router escucha los eventos `DOMContentLoaded` y `hashchange` para renderizar la vista correspondiente, verificando autenticación y rol antes de montar cada ruta.

---

## 🎨 Diseño

- Paleta oscura mate (sin dark mode toggle, es el tema por defecto)
- Tipografía **Inter** (Google Fonts)
- Totalmente responsivo
- Modales con animación fade-in
- Scrollbar personalizado
