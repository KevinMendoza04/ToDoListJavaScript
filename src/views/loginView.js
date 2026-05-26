export default function loginView() {
    return `<div id="login_container" class="grid grid-cols-1 md:grid-cols-2 min-h-screen w-full">
        <div class="col-span-1 h-full bg-slate-300 grid place-items-center">
          <form id="loginForm" class="bg-red-200 flex flex-col p-5 rounded-xl shadow shadow-gray-500 w-100 gap-3">
            <label for="username">Username</label>
            <input type="text" name="username" id="username" class="bg-gray-200 rounded-lg p-2" placeholder="jhon.doe">
            <label for="password">Password</label>
            <input type="password" name="password" id="password" class="bg-gray-200 rounded-lg p-2" placeholder="*********">
            
            <button id="btnLogin" class="bg-indigo-200 hover:bg-indigo-400 cursor-pointer py-2 rounded-xl">Login</button>

          </form>
        </div>
        <div class="col-span-1 hidden md:block h-full bg-cyan-300"></div>
      </div>`
}