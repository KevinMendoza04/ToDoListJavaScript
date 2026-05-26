export default function layout(content) {
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
            <a href="/home">Home</a>
            <a href="/users">Users</a>
          </div>
        </sidebar>
        <main 
        id="principal_content" 
        class="bg-gray-500 col-span-7 p-5">
        ${content}
        </main>
      </section>`
}