const API_URL = "http://localhost:3000"

// ─── API helpers ────────────────────────────────────────────────────────────

export async function getAllTodos() {
  const res = await fetch(`${API_URL}/todo_list`)
  if (!res.ok) throw new Error("Error al obtener tareas")
  return res.json()
}

export async function getTodosByUser(userId) {
  const res = await fetch(`${API_URL}/todo_list?id_user=${userId}`)
  if (!res.ok) throw new Error("Error al obtener tareas del usuario")
  return res.json()
}

export async function createTodo(data) {
  const res = await fetch(`${API_URL}/todo_list`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error("Error al crear tarea")
  return res.json()
}

export async function updateTodo(id, data) {
  const res = await fetch(`${API_URL}/todo_list/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error("Error al actualizar tarea")
  return res.json()
}

export async function patchTodo(id, data) {
  const res = await fetch(`${API_URL}/todo_list/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error("Error al actualizar tarea")
  return res.json()
}

export async function deleteTodo(id) {
  const res = await fetch(`${API_URL}/todo_list/${id}`, {
    method: "DELETE"
  })
  if (!res.ok) throw new Error("Error al eliminar tarea")
  return true
}

export async function getAllUsers() {
  const res = await fetch(`${API_URL}/users`)
  if (!res.ok) throw new Error("Error al obtener usuarios")
  return res.json()
}
