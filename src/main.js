import './style.css'

import notFoundView from './views/notFoundView.js'
import homeView from './views/homeView.js'
import loginView from './views/loginView.js'
import userView from './views/userView.js'

import { loginController } from './controllers/login.controller.js'

import layout from './components/layout.js'

const appContainer = document.getElementById("app")

const router = {
  home: {
    view: homeView,
  },

  login: {
    view: loginView,
    controller: loginController
  },

  users: {
    view: userView
  }
}

async function renderRoute() {

  const path = window.location.hash.replace("#", "") || ""

  const route = router[path]

  if (!route) {
    appContainer.innerHTML = notFoundView()
    return
  }

  // LOGIN sin layout
  if (path === "login") {
    appContainer.innerHTML = route.view()

    if (route.controller) {
      await route.controller()
    }

    return
  }

  // resto con layout
  appContainer.innerHTML = layout()

  document.getElementById("principal_content").innerHTML =
    route.view()

  if (route.controller) {
    await route.controller()
  }
}

document.addEventListener("DOMContentLoaded", renderRoute)

window.addEventListener("hashchange", renderRoute)