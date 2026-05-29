const API_URL = "http://localhost:3000"

export async function loginController() {
  const form = document.getElementById("loginForm")

  form.addEventListener("submit", async (event) => {
    event.preventDefault()

    const email = document.getElementById("email").value.trim()
    const password = document.getElementById("password").value.trim()
    const errorBox = document.getElementById("login_error")

    errorBox.classList.add("hidden")
    errorBox.textContent = ""

    if (!email || !password) {
      showError(errorBox, "Por favor completa todos los campos.")
      return
    }

    const btnLogin = document.getElementById("btnLogin")
    btnLogin.disabled = true
    btnLogin.textContent = "Ingresando..."

    try {
      const user = await loginFunction(email, password)

      if (user) {
        localStorage.setItem("user", JSON.stringify(user))
        window.location.hash = "#home"
      } else {
        showError(errorBox, "Correo o contraseña incorrectos.")
      }
    } catch (err) {
      showError(errorBox, "No se pudo conectar con el servidor. Asegúrate de que la API esté corriendo.")
    } finally {
      btnLogin.disabled = false
      btnLogin.textContent = "Iniciar sesión"
    }
  })
}

async function loginFunction(email, password) {
  const response = await fetch(`${API_URL}/users?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`)
  if (!response.ok) throw new Error("API error")
  const data = await response.json()
  return data.length > 0 ? data[0] : null
}

function showError(box, message) {
  box.textContent = message
  box.classList.remove("hidden")
}
