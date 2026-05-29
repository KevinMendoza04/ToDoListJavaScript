const navItems = [
  {
    name: "Tareas",
    route: "#home",
    roles: ["admin", "user"],
    icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
    </svg>`
  },
  {
    name: "Usuarios",
    route: "#users",
    roles: ["admin"],
    icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
    </svg>`
  }
]

function buildNavLinks(user) {
  return navItems
    .filter(item => item.roles.includes(user.role))
    .map(item => {
      const isActive = window.location.hash.split("?")[0] === item.route
      return `
        <a
          href="${item.route}"
          class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
          style="${isActive
            ? "background:#2e2645; color:#c8c2e8;"
            : "color:#6b6b78;"
          }"
          onmouseover="if(this.style.background !== 'rgb(46, 38, 69)') { this.style.background='#1c1c21'; this.style.color='#9494a0'; }"
          onmouseout="if(this.style.background !== 'rgb(46, 38, 69)') { this.style.background='transparent'; this.style.color='#6b6b78'; }"
        >
          ${item.icon}
          ${item.name}
        </a>
      `
    })
    .join("")
}

function getInitials(name = "") {
  return name.split(" ").slice(0, 2).map(n => n[0]).join("").toUpperCase()
}

export default function layout() {
  const user = JSON.parse(localStorage.getItem("user"))
  const navLinks = buildNavLinks(user)
  const initials = getInitials(user?.full_name)

  const roleBadge = user?.role === "admin"
    ? `<span class="text-xs font-semibold px-2 py-0.5 rounded-full" style="background:#2d2a1a; color:#c9a84c;">Admin</span>`
    : `<span class="text-xs font-semibold px-2 py-0.5 rounded-full" style="background:#1a2535; color:#5a9fd4;">User</span>`

  const avatarBg = user?.role === "admin" ? "#2d2a1a" : "#1a2535"
  const avatarColor = user?.role === "admin" ? "#c9a84c" : "#5a9fd4"

  return `
    <div class="flex min-h-screen" style="background:#111114; font-family:'Inter',sans-serif;">

      <!-- ── Sidebar ── -->
      <aside class="w-56 flex flex-col shrink-0" style="background:#0d0d0f; border-right:1px solid #1c1c21;">

        <!-- Brand -->
        <div class="flex items-center gap-2.5 px-5 py-5" style="border-bottom:1px solid #1c1c21;">
          <div class="w-8 h-8 rounded-lg flex items-center justify-center" style="background:#2e2645;">
            <svg class="w-4 h-4" style="color:#a096d4;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
            </svg>
          </div>
          <span class="font-bold text-base tracking-tight" style="color:#e8e8ee;">Todo App</span>
        </div>

        <!-- Nav label -->
        <div class="px-5 pt-5 pb-2">
          <span class="text-xs font-semibold uppercase tracking-widest" style="color:#36363f;">Menú</span>
        </div>

        <!-- Nav links -->
        <nav class="flex flex-col gap-1 px-3 flex-1">
          ${navLinks}
        </nav>

        <!-- User block -->
        <div class="px-3 py-4" style="border-top:1px solid #1c1c21;">
          <div class="flex items-center gap-3 px-2 py-2 rounded-xl mb-1" style="background:#16161a;">
            <div class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
              style="background:${avatarBg}; color:${avatarColor};">
              ${initials}
            </div>
            <div class="flex flex-col min-w-0 flex-1">
              <span class="text-sm font-semibold truncate" style="color:#c2c2cc;">${user?.full_name}</span>
              ${roleBadge}
            </div>
          </div>
          <button
            id="btn_logout"
            class="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer mt-1"
            style="background:transparent; color:#4a4a55; border:none;"
            onmouseover="this.style.background='#1c1c21'; this.style.color='#e07070';"
            onmouseout="this.style.background='transparent'; this.style.color='#4a4a55';"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
            </svg>
            Cerrar sesión
          </button>
        </div>
      </aside>

      <!-- ── Main ── -->
      <div class="flex flex-col flex-1 min-w-0">

        <!-- Top bar -->
        <header class="flex items-center justify-between px-6 py-4" style="background:#0d0d0f; border-bottom:1px solid #1c1c21;">
          <div>
            <p class="text-xs font-semibold uppercase tracking-widest mb-0.5" style="color:#36363f;">Bienvenido</p>
            <h2 class="text-sm font-semibold" style="color:#9494a0;">${user?.full_name}</h2>
          </div>
          <div class="flex items-center gap-3">
            ${roleBadge}
            <div class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
              style="background:${avatarBg}; color:${avatarColor};">
              ${initials}
            </div>
          </div>
        </header>

        <!-- Page content -->
        <main id="principal_content" class="flex-1 p-6 overflow-auto" style="background:#111114;">
        </main>
      </div>
    </div>
  `
}
