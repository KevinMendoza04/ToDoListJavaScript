import { getAllUsers, getAllTodos } from "./todo.controller.js"

function getInitials(name = "") {
  return name.split(" ").slice(0, 2).map(n => n[0]).join("").toUpperCase()
}

function renderUserCard(user, taskCount) {
  const isAdmin    = user.role === "admin"
  const avatarBg   = isAdmin ? "#2d2a1a" : "#1a2535"
  const avatarColor = isAdmin ? "#c9a84c" : "#5a9fd4"
  const roleBadge  = isAdmin
    ? `<span class="text-xs font-semibold px-2 py-0.5 rounded-full" style="background:#2d2a1a; color:#c9a84c;">Admin</span>`
    : `<span class="text-xs font-semibold px-2 py-0.5 rounded-full" style="background:#1a2535; color:#5a9fd4;">User</span>`

  return `
    <div
      class="rounded-2xl p-5 flex flex-col gap-4 transition-all"
      style="background:#16161a; border:1px solid #1c1c21;"
      onmouseover="this.style.borderColor='#2a2a32'"
      onmouseout="this.style.borderColor='#1c1c21'"
    >
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shrink-0"
          style="background:${avatarBg}; color:${avatarColor};">
          ${getInitials(user.full_name)}
        </div>
        <div class="flex flex-col min-w-0">
          <span class="font-semibold text-sm truncate" style="color:#c2c2cc;">${user.full_name}</span>
          <span class="text-xs truncate" style="color:#4a4a55;">${user.email}</span>
        </div>
      </div>

      <div class="flex items-center justify-between" style="border-top:1px solid #1c1c21; padding-top:12px;">
        ${roleBadge}
        <span class="text-xs" style="color:#4a4a55;">
          <span class="font-semibold" style="color:#6b6b78;">${taskCount}</span>
          tarea${taskCount !== 1 ? "s" : ""}
        </span>
      </div>

      <p class="text-xs" style="color:#36363f;">
        <span style="color:#4a4a55;">@</span>${user.username}
      </p>
    </div>
  `
}

export async function userController() {
  const container = document.getElementById("users_container")

  try {
    const [users, todos] = await Promise.all([getAllUsers(), getAllTodos()])

    const taskCountMap = {}
    todos.forEach(t => {
      taskCountMap[t.id_user] = (taskCountMap[t.id_user] || 0) + 1
    })

    container.innerHTML = users
      .map(u => renderUserCard(u, taskCountMap[u.id] || 0))
      .join("")
  } catch {
    container.innerHTML = `
      <div class="rounded-xl px-4 py-3 text-sm col-span-full"
        style="background:#2d1a1a; border:1px solid #5a2a2a; color:#e07070;">
        ⚠️ No se pudo cargar la lista de usuarios.
      </div>
    `
  }
}
