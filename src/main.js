import "./style.css"
import notFoundView from "./views/notFoundView.js"
import homeView from "./views/homeView.js"
import loginView from "./views/loginView.js"
import userView from "./views/userView.js"
import { loginController } from "./controllers/login.controller.js"
import { homeController } from "./controllers/home.controller.js"
import { userController } from "./controllers/user.controller.js"
import layout from "./components/layout.js"

const appContainer = document.getElementById("app")

// ─── Route definitions ────────────────────────────────────────────────────────

const router = {
  home: {
    view: homeView,
    controller: homeController,
    roles: ["admin", "user"]
  },
  users: {
    view: userView,
    controller: userController,
    roles: ["admin"]
  },
  login: {
    view: loginView,
    controller: loginController,
    public: true
  }
}

// ─── Router ───────────────────────────────────────────────────────────────────

async function renderRoute() {
  const user = JSON.parse(localStorage.getItem("user"))

  // Extract path from hash (ignore query params)
  const hash = window.location.hash.replace("#", "")
  const path = hash.split("?")[0] || "home"

  const route = router[path]

  // 404
  if (!route) {
    appContainer.innerHTML = notFoundView()
    return
  }

  // Public routes (login)
  if (route.public) {
    // If already logged in, redirect to home
    if (user) {
      window.location.hash = "#home"
      return
    }
    appContainer.innerHTML = route.view()
    if (route.controller) await route.controller()
    return
  }

  // Protected routes: require login
  if (!user) {
    window.location.hash = "#login"
    return
  }

  // Role-based access
  if (route.roles && !route.roles.includes(user.role)) {
    window.location.hash = "#home"
    return
  }

  // Render with layout
  appContainer.innerHTML = layout()

  const content = document.getElementById("principal_content")
  content.innerHTML = route.view()

  // Logout button
  document.getElementById("btn_logout")?.addEventListener("click", () => {
    localStorage.removeItem("user")
    window.location.hash = "#login"
  })

  if (route.controller) {
    await route.controller()
  }
}

// ─── Init ─────────────────────────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", renderRoute)
window.addEventListener("hashchange", renderRoute)
