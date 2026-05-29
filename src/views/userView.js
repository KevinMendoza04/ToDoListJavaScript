export default function userView() {
  return `
    <div class="flex flex-col gap-6" style="font-family:'Inter',sans-serif;">
      <div>
        <h1 class="text-xl font-bold tracking-tight" style="color:#e8e8ee;">Usuarios del sistema</h1>
        <p class="text-sm mt-0.5" style="color:#4a4a55;">Listado de todos los usuarios registrados</p>
      </div>

      <div id="users_container" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div class="flex items-center justify-center py-16 col-span-full">
          <div class="w-7 h-7 rounded-full border-2 border-t-transparent animate-spin"
            style="border-color:#5b4f8a; border-top-color:transparent;"></div>
        </div>
      </div>
    </div>
  `
}
