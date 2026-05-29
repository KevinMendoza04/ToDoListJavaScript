# Todo App — Vanilla JavaScript

Aplicación de gestión de tareas con arquitectura MVC, autenticación basada en roles, filtros dinámicos mediante query params y consumo de API REST.

---

## Stack Técnico

- **JavaScript Vanilla** — sin frameworks, manipulación directa del DOM
- **Vite 6.x** — bundler y dev server con HMR
- **Tailwind CSS 4.x** — utility-first styling
- **json-server** — mock REST API para desarrollo
- **Node.js 22.14.0** — runtime

---

## Arquitectura

### Patrón MVC Simplificado

```
Views (template strings) → Controllers (lógica + eventos) → API (fetch)
                ↓
            Router (hash-based)
```

**Router (`main.js`)**
- Hash-based routing con soporte de query params
- Protección de rutas por autenticación y rol
- Renderizado condicional de layout según tipo de ruta (pública vs protegida)

**Views**
- Funciones puras que retornan HTML como strings
- Sin JSX ni templates externos
- Inyección mediante `innerHTML` en contenedores específicos

**Controllers**
- Event delegation para optimizar listeners en listas dinámicas
- Separación entre lógica de negocio y llamadas a API
- Manejo de estado local (filtros, modales, formularios)

**Layout Component**
- Sidebar con navegación dinámica según rol del usuario
- Renderizado condicional de rutas permitidas
- Persistencia de sesión mediante `localStorage`

---

## Sistema de Autenticación

**Flujo:**
1. Login valida credenciales contra `/users` con query params
2. Usuario autenticado se almacena en `localStorage`
3. Router verifica sesión en cada cambio de ruta
4. Redirección automática a login si no hay sesión activa

**Control de acceso:**
- Rutas públicas: `#login`
- Rutas protegidas: `#home`, `#users`
- Validación de rol antes de renderizar vistas restringidas

---

## Gestión de Tareas

### CRUD Completo

| Operación | Método | Endpoint | Permisos |
|---|---|---|---|
| Listar | GET | `/todo_list?id_user={id}` | User: propias / Admin: todas |
| Crear | POST | `/todo_list` | User: propias |
| Actualizar | PUT | `/todo_list/:id` | User: propias / Admin: todas |
| Cambiar estado | PATCH | `/todo_list/:id` | Admin únicamente |
| Eliminar | DELETE | `/todo_list/:id` | Admin únicamente |

### Estados de Tarea

```javascript
{
  initial: "Tarea sin iniciar",
  process: "En progreso",
  completed: "Finalizada"
}
```

Transiciones de estado controladas mediante `<select>` con event listener en el contenedor padre (event delegation).

---

## Sistema de Filtros

**Implementación:**
- Query params en hash: `#home?status=process&search=estudiar&user=2`
- Sincronización bidireccional entre URL y inputs de filtro
- Debounce de 300ms en búsqueda por texto
- Filtros aplicados en cliente sobre dataset completo

**Lógica de filtrado:**
```javascript
function applyFilters(tasks, params) {
  let filtered = [...tasks]
  if (params.status) filtered = filtered.filter(t => t.status === params.status)
  if (params.search) filtered = filtered.filter(t => 
    t.title.toLowerCase().includes(params.search.toLowerCase())
  )
  if (params.user) filtered = filtered.filter(t => t.id_user === params.user)
  return filtered
}
```

---

## Roles y Permisos

### Admin
- Vista global de todas las tareas
- Filtro adicional por usuario
- Cambio de estado mediante dropdown inline
- Eliminación de cualquier tarea
- Acceso a vista de usuarios (`#users`)

### User
- Vista limitada a tareas propias (`?id_user={current_user_id}`)
- Creación y edición de tareas propias
- Sin acceso a cambio de estado ni eliminación
- Rutas administrativas bloqueadas por router

---

## Decisiones de Diseño

**Event Delegation**
- Un solo listener en `#tasks_container` captura clicks en botones de editar/eliminar
- Evita re-registrar listeners en cada re-render
- Identificación de acción mediante `data-action` y `data-task-id`

**Modales**
- Controlados mediante clases CSS (`hidden`)
- Reutilización del mismo modal para crear/editar
- Estado del formulario limpiado en cada apertura
- Cierre por overlay, botón X o cancelar

**Renderizado**
- Re-render completo de lista en cada cambio de filtro
- Stats de admin calculadas sobre dataset completo
- Badges de estado con colores semánticos

**Paleta Oscura Mate**
- Tema único sin toggle (no dark mode, es el default)
- Grises profundos (#111114, #16161a, #1c1c21)
- Violeta mate como acento (#5b4f8a)
- Tipografía Inter con antialiasing

---

## Estructura de Datos

**Usuario:**
```json
{
  "id": "1",
  "username": "user.name",
  "email": "user@mail.com",
  "password": "plain_text",
  "full_name": "User Name",
  "role": "admin|user"
}
```

**Tarea:**
```json
{
  "id": "1",
  "id_user": "2",
  "title": "Título",
  "description": "Descripción opcional",
  "status": "initial|process|completed"
}
```

---

## Optimizaciones

- Debounce en input de búsqueda para reducir re-renders
- Event delegation en lugar de listeners individuales
- Fetch paralelo de usuarios y tareas con `Promise.all()`
- CSS custom properties para paleta de colores reutilizable
- Lazy loading de vistas (solo se cargan al navegar)

---

## Consideraciones de Seguridad

⚠️ **Proyecto académico** — no apto para producción:
- Contraseñas en texto plano en `db.json`
- Sin validación server-side
- Sin rate limiting
- Sin sanitización de inputs (XSS vulnerable)
- Token de sesión en `localStorage` (vulnerable a XSS)

Para producción se requeriría:
- Hash de contraseñas (bcrypt)
- JWT con refresh tokens
- Validación y sanitización server-side
- HTTPS obligatorio
- CORS configurado correctamente
