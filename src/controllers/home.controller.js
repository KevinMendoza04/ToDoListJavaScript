import {
  getAllTodos,
  getTodosByUser,
  createTodo,
  updateTodo,
  deleteTodo,
  patchTodo,
  getAllUsers
} from "./todo.controller.js"

// ─── Query params helpers ────────────────────────────────────────────────────

function getQueryParams() {
  const hash = window.location.hash
  const queryIndex = hash.indexOf("?")
  if (queryIndex === -1) return {}
  const queryString = hash.slice(queryIndex + 1)
  const params = {}
  new URLSearchParams(queryString).forEach((value, key) => {
    params[key] = value
  })
  return params
}

function setQueryParams(params) {
  const base = window.location.hash.split("?")[0]
  const filtered = Object.fromEntries(
    Object.entries(params).filter(([, v]) => v !== "" && v !== null && v !== undefined)
  )
  const query = new URLSearchParams(filtered).toString()
  const newHash = query ? `${base}?${query}` : base
  history.replaceState(null, "", newHash)
}

// ─── Render helpers ──────────────────────────────────────────────────────────

// Status styles for dark matte palette
const STATUS_STYLE = {
  initial:   { bg: "#1c1c21", border: "#2a2a32", dot: "#4a4a55",  text: "#6b6b78",  label: "Inicial"     },
  process:   { bg: "#2d2a1a", border: "#3d3520", dot: "#c9a84c",  text: "#c9a84c",  label: "En proceso"  },
  completed: { bg: "#1a2d1e", border: "#1e3a24", dot: "#5aab6a",  text: "#5aab6a",  label: "Completado"  }
}

function renderTaskCard(task, user, usersMap, isAdmin) {
  const s = STATUS_STYLE[task.status] || STATUS_STYLE.initial
  const taskOwner = usersMap[task.id_user]
  const isOwner = user.id === task.id_user
  const canEdit = isAdmin || isOwner
  const canDelete = isAdmin

  const ownerBg   = taskOwner?.role === "admin" ? "#2d2a1a" : "#1a2535"
  const ownerColor = taskOwner?.role === "admin" ? "#c9a84c" : "#5a9fd4"

  return `
    <div
      class="rounded-2xl p-4 flex flex-col gap-3 transition-all"
      style="background:#16161a; border:1px solid #1c1c21;"
      onmouseover="this.style.borderColor='#2a2a32'"
      onmouseout="this.style.borderColor='#1c1c21'"
      data-task-id="${task.id}"
    >
      <!-- Title + status badge -->
      <div class="flex items-start justify-between gap-2">
        <h3 class="text-sm font-semibold leading-snug flex-1" style="color:#c2c2cc;">${escapeHtml(task.title)}</h3>
        <span
          class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold shrink-0"
          style="background:${s.bg}; border:1px solid ${s.border}; color:${s.text};"
        >
          <span class="w-1.5 h-1.5 rounded-full" style="background:${s.dot};"></span>
          ${s.label}
        </span>
      </div>

      <!-- Description -->
      ${task.description
        ? `<p class="text-xs leading-relaxed" style="color:#4a4a55;">${escapeHtml(task.description)}</p>`
        : ""
      }

      <!-- Owner (admin view) -->
      ${isAdmin && taskOwner
        ? `<div class="flex items-center gap-2">
            <div class="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
              style="background:${ownerBg}; color:${ownerColor};">
              ${getInitials(taskOwner.full_name)}
            </div>
            <span class="text-xs" style="color:#4a4a55;">${escapeHtml(taskOwner.full_name)}</span>
          </div>`
        : ""
      }

      <!-- Actions row -->
      <div class="flex items-center gap-2 pt-1" style="border-top:1px solid #1c1c21;">
        ${isAdmin
          ? `<select
              data-action="change-status"
              data-task-id="${task.id}"
              class="text-xs rounded-lg px-2 py-1.5 outline-none cursor-pointer flex-1"
              style="background:#1c1c21; border:1px solid #2a2a32; color:#6b6b78;"
            >
              <option value="initial"   ${task.status === "initial"   ? "selected" : ""}>Inicial</option>
              <option value="process"   ${task.status === "process"   ? "selected" : ""}>En proceso</option>
              <option value="completed" ${task.status === "completed" ? "selected" : ""}>Completado</option>
            </select>`
          : ""
        }

        <div class="flex gap-1 ml-auto">
          ${canEdit
            ? `<button
                data-action="edit"
                data-task-id="${task.id}"
                class="p-1.5 rounded-lg transition-all cursor-pointer"
                style="background:transparent; color:#36363f; border:none;"
                onmouseover="this.style.background='#2e2645'; this.style.color='#a096d4';"
                onmouseout="this.style.background='transparent'; this.style.color='#36363f';"
                title="Editar"
              >
                <svg class="w-4 h-4 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                </svg>
              </button>`
            : ""
          }
          ${canDelete
            ? `<button
                data-action="delete"
                data-task-id="${task.id}"
                class="p-1.5 rounded-lg transition-all cursor-pointer"
                style="background:transparent; color:#36363f; border:none;"
                onmouseover="this.style.background='#2d1a1a'; this.style.color='#e07070';"
                onmouseout="this.style.background='transparent'; this.style.color='#36363f';"
                title="Eliminar"
              >
                <svg class="w-4 h-4 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
              </button>`
            : ""
          }
        </div>
      </div>
    </div>
  `
}

function renderEmptyState(message = "No hay tareas para mostrar") {
  return `
    <div class="flex flex-col items-center justify-center py-16 text-center">
      <svg class="w-14 h-14 mb-4" style="color:#2a2a32;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
      </svg>
      <p class="text-sm font-semibold" style="color:#4a4a55;">${message}</p>
      <p class="text-xs mt-1" style="color:#36363f;">Intenta cambiar los filtros o crea una nueva tarea</p>
    </div>
  `
}

function renderStats(tasks) {
  const total     = tasks.length
  const initial   = tasks.filter(t => t.status === "initial").length
  const process   = tasks.filter(t => t.status === "process").length
  const completed = tasks.filter(t => t.status === "completed").length

  const stats = [
    { label: "Total",       value: total,     bg: "#16161a", border: "#1c1c21", dot: "#5b4f8a", textColor: "#9494a0" },
    { label: "Inicial",     value: initial,   bg: "#16161a", border: "#1c1c21", dot: "#4a4a55", textColor: "#6b6b78" },
    { label: "En proceso",  value: process,   bg: "#2d2a1a", border: "#3d3520", dot: "#c9a84c", textColor: "#c9a84c" },
    { label: "Completado",  value: completed, bg: "#1a2d1e", border: "#1e3a24", dot: "#5aab6a", textColor: "#5aab6a" }
  ]

  return stats.map(s => `
    <div class="rounded-2xl p-4 flex items-center gap-3"
      style="background:${s.bg}; border:1px solid ${s.border};">
      <span class="w-2.5 h-2.5 rounded-full shrink-0" style="background:${s.dot};"></span>
      <div>
        <p class="text-2xl font-bold" style="color:#e8e8ee;">${s.value}</p>
        <p class="text-xs font-semibold" style="color:${s.textColor};">${s.label}</p>
      </div>
    </div>
  `).join("")
}

// ─── Filter logic ────────────────────────────────────────────────────────────

function applyFilters(tasks, params) {
  let filtered = [...tasks]

  if (params.status) {
    filtered = filtered.filter(t => t.status === params.status)
  }

  if (params.search) {
    const q = params.search.toLowerCase()
    filtered = filtered.filter(t =>
      t.title.toLowerCase().includes(q) ||
      (t.description && t.description.toLowerCase().includes(q))
    )
  }

  if (params.user) {
    filtered = filtered.filter(t => t.id_user === params.user)
  }

  return filtered
}

// ─── Utilities ───────────────────────────────────────────────────────────────

function escapeHtml(str = "") {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

function getInitials(name = "") {
  return name.split(" ").slice(0, 2).map(n => n[0]).join("").toUpperCase()
}

function generateId() {
  return Date.now().toString()
}

// ─── Main controller ─────────────────────────────────────────────────────────

export async function homeController() {
  const user = JSON.parse(localStorage.getItem("user"))
  const isAdmin = user?.role === "admin"

  // State
  let allTasks = []
  let allUsers = []
  let usersMap = {}
  let pendingDeleteId = null

  // ── Load data ──────────────────────────────────────────────────────────────
  try {
    if (isAdmin) {
      [allTasks, allUsers] = await Promise.all([getAllTodos(), getAllUsers()])
    } else {
      [allTasks, allUsers] = await Promise.all([getTodosByUser(user.id), getAllUsers()])
    }
    usersMap = Object.fromEntries(allUsers.map(u => [u.id, u]))
  } catch (err) {
    document.getElementById("tasks_container").innerHTML = `
      <div class="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm">
        ⚠️ No se pudo conectar con la API. Asegúrate de que json-server esté corriendo en el puerto 3000.
      </div>
    `
    return
  }

  // ── Populate user filter (admin) ───────────────────────────────────────────
  if (isAdmin) {
    const filterUser = document.getElementById("filter_user")
    if (filterUser) {
      allUsers.forEach(u => {
        const opt = document.createElement("option")
        opt.value = u.id
        opt.textContent = u.full_name
        filterUser.appendChild(opt)
      })
    }
  }

  // ── Render tasks ───────────────────────────────────────────────────────────
  function renderTasks() {
    const params = getQueryParams()
    const filtered = applyFilters(allTasks, params)
    const container = document.getElementById("tasks_container")

    // Sync filter inputs with query params
    const searchInput = document.getElementById("filter_search")
    const statusSelect = document.getElementById("filter_status")
    const userSelect = document.getElementById("filter_user")

    if (searchInput && params.search !== undefined) searchInput.value = params.search
    if (statusSelect && params.status !== undefined) statusSelect.value = params.status
    if (userSelect && params.user !== undefined) userSelect.value = params.user

    // Stats
    if (isAdmin) {
      const statsContainer = document.getElementById("stats_container")
      if (statsContainer) statsContainer.innerHTML = renderStats(allTasks)
    }

    if (filtered.length === 0) {
      container.innerHTML = renderEmptyState()
      return
    }

    container.innerHTML = `
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        ${filtered.map(task => renderTaskCard(task, user, usersMap, isAdmin)).join("")}
      </div>
    `
  }

  renderTasks()

  // ── Filter events ──────────────────────────────────────────────────────────
  let searchTimeout = null

  document.getElementById("filter_search")?.addEventListener("input", (e) => {
    clearTimeout(searchTimeout)
    searchTimeout = setTimeout(() => {
      const params = getQueryParams()
      params.search = e.target.value.trim()
      setQueryParams(params)
      renderTasks()
    }, 300)
  })

  document.getElementById("filter_status")?.addEventListener("change", (e) => {
    const params = getQueryParams()
    params.status = e.target.value
    setQueryParams(params)
    renderTasks()
  })

  document.getElementById("filter_user")?.addEventListener("change", (e) => {
    const params = getQueryParams()
    params.user = e.target.value
    setQueryParams(params)
    renderTasks()
  })

  document.getElementById("btn_clear_filters")?.addEventListener("click", () => {
    setQueryParams({})
    document.getElementById("filter_search").value = ""
    document.getElementById("filter_status").value = ""
    if (isAdmin) document.getElementById("filter_user").value = ""
    renderTasks()
  })

  // ── Task card actions (event delegation) ──────────────────────────────────
  document.getElementById("tasks_container").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-action]")
    if (!btn) return

    const action = btn.dataset.action
    const taskId = btn.dataset.taskId

    if (action === "edit") openEditModal(taskId)
    if (action === "delete") openDeleteModal(taskId)
  })

  document.getElementById("tasks_container").addEventListener("change", async (e) => {
    const select = e.target.closest("[data-action='change-status']")
    if (!select) return

    const taskId = select.dataset.taskId
    const newStatus = select.value

    try {
      await patchTodo(taskId, { status: newStatus })
      const idx = allTasks.findIndex(t => t.id === taskId)
      if (idx !== -1) allTasks[idx].status = newStatus
      renderTasks()
    } catch {
      alert("Error al cambiar el estado")
    }
  })

  // ── Modal: Create task ─────────────────────────────────────────────────────
  document.getElementById("btn_new_task")?.addEventListener("click", () => {
    openCreateModal()
  })

  function openCreateModal() {
    document.getElementById("modal_title").textContent = "Nueva tarea"
    document.getElementById("modal_submit").textContent = "Crear tarea"
    document.getElementById("task_id").value = ""
    document.getElementById("task_title").value = ""
    document.getElementById("task_description").value = ""
    document.getElementById("task_status").value = "initial"
    document.getElementById("task_modal").classList.remove("hidden")
  }

  function openEditModal(taskId) {
    const task = allTasks.find(t => t.id === taskId)
    if (!task) return

    document.getElementById("modal_title").textContent = "Editar tarea"
    document.getElementById("modal_submit").textContent = "Guardar cambios"
    document.getElementById("task_id").value = task.id
    document.getElementById("task_title").value = task.title
    document.getElementById("task_description").value = task.description || ""
    document.getElementById("task_status").value = task.status
    document.getElementById("task_modal").classList.remove("hidden")
  }

  function closeTaskModal() {
    document.getElementById("task_modal").classList.add("hidden")
  }

  document.getElementById("modal_close")?.addEventListener("click", closeTaskModal)
  document.getElementById("modal_cancel")?.addEventListener("click", closeTaskModal)

  document.getElementById("task_modal")?.addEventListener("click", (e) => {
    if (e.target === document.getElementById("task_modal")) closeTaskModal()
  })

  // ── Form submit ────────────────────────────────────────────────────────────
  document.getElementById("task_form")?.addEventListener("submit", async (e) => {
    e.preventDefault()

    const id = document.getElementById("task_id").value
    const title = document.getElementById("task_title").value.trim()
    const description = document.getElementById("task_description").value.trim()
    const status = document.getElementById("task_status").value

    if (!title) {
      alert("El título es obligatorio")
      return
    }

    const submitBtn = document.getElementById("modal_submit")
    submitBtn.disabled = true
    submitBtn.textContent = "Guardando..."

    try {
      if (id) {
        // Edit
        const existing = allTasks.find(t => t.id === id)
        const updated = await updateTodo(id, {
          ...existing,
          title,
          description,
          status
        })
        const idx = allTasks.findIndex(t => t.id === id)
        if (idx !== -1) allTasks[idx] = updated
      } else {
        // Create
        const newTask = await createTodo({
          id: generateId(),
          id_user: user.id,
          title,
          description,
          status
        })
        allTasks.push(newTask)
      }

      closeTaskModal()
      renderTasks()
    } catch {
      alert("Error al guardar la tarea")
    } finally {
      submitBtn.disabled = false
    }
  })

  // ── Modal: Delete ──────────────────────────────────────────────────────────
  function openDeleteModal(taskId) {
    pendingDeleteId = taskId
    document.getElementById("delete_modal").classList.remove("hidden")
  }

  function closeDeleteModal() {
    pendingDeleteId = null
    document.getElementById("delete_modal").classList.add("hidden")
  }

  document.getElementById("delete_cancel")?.addEventListener("click", closeDeleteModal)

  document.getElementById("delete_modal")?.addEventListener("click", (e) => {
    if (e.target === document.getElementById("delete_modal")) closeDeleteModal()
  })

  document.getElementById("delete_confirm")?.addEventListener("click", async () => {
    if (!pendingDeleteId) return

    const confirmBtn = document.getElementById("delete_confirm")
    confirmBtn.disabled = true
    confirmBtn.textContent = "Eliminando..."

    try {
      await deleteTodo(pendingDeleteId)
      allTasks = allTasks.filter(t => t.id !== pendingDeleteId)
      closeDeleteModal()
      renderTasks()
    } catch {
      alert("Error al eliminar la tarea")
    } finally {
      confirmBtn.disabled = false
      confirmBtn.textContent = "Eliminar"
    }
  })
}
