
const views = [
  {
    name: "home",
    route: "#home",
    role: ["admin", "user",],
    icon: ""
  },
  {
    name: "users",
    route: "#users",
    role: ["admin"],
    icon: ""
  },
  {
    name: "example",
    route: "#example",
    role: ["user"],
    icon: ""
  }
]

function renderRoute() {
  const user = JSON.parse(localStorage.getItem("user"))

  const routes = views
    .filter(view => view.role.includes(user.role))
    .map(view => {
      return `
        <a href="${view.route}" class="text-white py-2">
          ${view.name}
        </a>
      `
    })

  return routes
}

export default function layout() {
  const routes = renderRoute()
  return `
    <header class="flex flex-row bg-teal-500 justify-between w-full px-2 py-3">
        <button class="bg-orange-200 p-2 rounded-full cursor-pointer">
          User
        </button>
        <button class="bg-cyan-200 p-2 rounded-full cursor-pointer">Logout</button>
      </header>
      <section class="grid grid-cols-8">
        <sidebar class="bg-sky-600 min-h-screen col-span-1">
          <div class="flex flex-col ml-6">
            ${routes.map((item) => {
    return item
  }).join("")
    }
          </div>
        </sidebar>
        <main 
        id="principal_content" 
        class="bg-gray-500 col-span-7 p-5">
        </main>
      </section>`
}
