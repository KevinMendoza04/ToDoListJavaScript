import './style.css'
import notFoundView from './views/notFoundView.js'
import homeView from './views/homeView.js'
import loginView from './views/loginView.js'
import { loginController } from './controllers/login.controller.js'
import layout from './components/layout.js'

const appContainer = document.getElementById("app")
const router = {
  "home": {
    view: homeView()
  },
  "login": {
    view: loginView(),
    controller: loginController
  },
}

document.addEventListener("DOMContentLoaded", async () => {
  const path = window.location.pathname.replace("/", "")

  if (path !== "login" && router[path]?.view) {
    const content = layout(router[path].view)
    appContainer.innerHTML = content
    await router[path].controller

  } else if (path === "login") {
    appContainer.innerHTML = router[path].view
    await router[path].controller()
    
  } else {
    appContainer.innerHTML = notFoundView()
  }
})