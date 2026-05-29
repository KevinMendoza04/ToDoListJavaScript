export default function homeView() {
  const user = JSON.parse(localStorage.getItem("user"))
  const isAdmin = user?.role === "admin"

  return `
    <div class="flex flex-col gap-6" style="font-family:'Inter',sans-serif;">

      <!-- Page header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-xl font-bold tracking-tight" style="color:#e8e8ee;">
            ${isAdmin ? "Panel de Administración" : "Mis Tareas"}
          </h1>
          <p class="text-sm mt-0.5" style="color:#4a4a55;">
            ${isAdmin ? "Gestiona todas las tareas del sistema" : "Crea y gestiona tus tareas personales"}
          </p>
        </div>
        ${!isAdmin ? `
          <button
            id="btn_new_task"
            class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer"
            style="background:#5b4f8a; color:#ece9f8; border:none;"
            onmouseover="this.style.background='#7c6fb5'"
            onmouseout="this.style.background='#5b4f8a'"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
            Nueva tarea
          </button>
        ` : ""}
      </div>

      <!-- Filters -->
      <div class="rounded-2xl p-4" style="background:#16161a; border:1px solid #1c1c21;">
        <div class="flex flex-wrap gap-3 items-end">

          <div class="flex flex-col gap-1.5 flex-1 min-w-[160px]">
            <label class="text-xs font-semibold uppercase tracking-widest" style="color:#4a4a55;">Buscar</label>
            <input
              type="text"
              id="filter_search"
              placeholder="Buscar tarea..."
              class="rounded-xl px-3 py-2 text-sm outline-none transition-all"
              style="background:#1c1c21; border:1px solid #2a2a32; color:#c2c2cc; caret-color:#a096d4;"
              onfocus="this.style.borderColor='#5b4f8a'; this.style.boxShadow='0 0 0 3px rgba(91,79,138,0.12)'"
              onblur="this.style.borderColor='#2a2a32'; this.style.boxShadow='none'"
            />
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-semibold uppercase tracking-widest" style="color:#4a4a55;">Estado</label>
            <select
              id="filter_status"
              class="rounded-xl px-3 py-2 text-sm outline-none cursor-pointer transition-all"
              style="background:#1c1c21; border:1px solid #2a2a32; color:#c2c2cc;"
            >
              <option value="">Todos</option>
              <option value="initial">Inicial</option>
              <option value="process">En proceso</option>
              <option value="completed">Completado</option>
            </select>
          </div>

          ${isAdmin ? `
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-semibold uppercase tracking-widest" style="color:#4a4a55;">Usuario</label>
              <select
                id="filter_user"
                class="rounded-xl px-3 py-2 text-sm outline-none cursor-pointer transition-all"
                style="background:#1c1c21; border:1px solid #2a2a32; color:#c2c2cc;"
              >
                <option value="">Todos</option>
              </select>
            </div>
          ` : ""}

          <button
            id="btn_clear_filters"
            class="px-3 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer"
            style="background:#1c1c21; border:1px solid #2a2a32; color:#6b6b78;"
            onmouseover="this.style.background='#222228'; this.style.color='#9494a0';"
            onmouseout="this.style.background='#1c1c21'; this.style.color='#6b6b78';"
          >
            Limpiar
          </button>
        </div>
      </div>

      <!-- Stats (admin only) -->
      ${isAdmin ? `<div id="stats_container" class="grid grid-cols-2 sm:grid-cols-4 gap-3"></div>` : ""}

      <!-- Task list -->
      <div id="tasks_container">
        <div class="flex items-center justify-center py-16">
          <div class="w-7 h-7 rounded-full border-2 border-t-transparent animate-spin" style="border-color:#5b4f8a; border-top-color:transparent;"></div>
        </div>
      </div>
    </div>

    <!-- ── Modal: Create / Edit ── -->
    <div id="task_modal" class="hidden fixed inset-0 z-50 flex items-center justify-center px-4" style="background:rgba(0,0,0,0.7);">
      <div class="modal-enter w-full max-w-md rounded-2xl p-6 flex flex-col gap-5" style="background:#16161a; border:1px solid #222228;">
        <div class="flex items-center justify-between">
          <h2 id="modal_title" class="text-base font-bold" style="color:#e8e8ee;">Nueva tarea</h2>
          <button id="modal_close" class="rounded-lg p-1.5 transition-all cursor-pointer" style="color:#4a4a55; background:transparent; border:none;"
            onmouseover="this.style.background='#1c1c21'; this.style.color='#9494a0';"
            onmouseout="this.style.background='transparent'; this.style.color='#4a4a55';">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <form id="task_form" class="flex flex-col gap-4">
          <input type="hidden" id="task_id" />

          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-semibold uppercase tracking-widest" style="color:#4a4a55;">
              Título <span style="color:#e07070;">*</span>
            </label>
            <input
              type="text"
              id="task_title"
              placeholder="Título de la tarea"
              required
              class="rounded-xl px-3 py-2.5 text-sm outline-none transition-all"
              style="background:#1c1c21; border:1px solid #2a2a32; color:#c2c2cc; caret-color:#a096d4;"
              onfocus="this.style.borderColor='#5b4f8a'; this.style.boxShadow='0 0 0 3px rgba(91,79,138,0.12)'"
              onblur="this.style.borderColor='#2a2a32'; this.style.boxShadow='none'"
            />
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-semibold uppercase tracking-widest" style="color:#4a4a55;">Descripción</label>
            <textarea
              id="task_description"
              rows="3"
              placeholder="Descripción opcional..."
              class="rounded-xl px-3 py-2.5 text-sm outline-none transition-all resize-none"
              style="background:#1c1c21; border:1px solid #2a2a32; color:#c2c2cc; caret-color:#a096d4;"
              onfocus="this.style.borderColor='#5b4f8a'; this.style.boxShadow='0 0 0 3px rgba(91,79,138,0.12)'"
              onblur="this.style.borderColor='#2a2a32'; this.style.boxShadow='none'"
            ></textarea>
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-semibold uppercase tracking-widest" style="color:#4a4a55;">Estado</label>
            <select
              id="task_status"
              class="rounded-xl px-3 py-2.5 text-sm outline-none cursor-pointer"
              style="background:#1c1c21; border:1px solid #2a2a32; color:#c2c2cc;"
            >
              <option value="initial">Inicial</option>
              <option value="process">En proceso</option>
              <option value="completed">Completado</option>
            </select>
          </div>

          <div class="flex gap-3 pt-1">
            <button type="button" id="modal_cancel"
              class="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer"
              style="background:#1c1c21; border:1px solid #2a2a32; color:#6b6b78;"
              onmouseover="this.style.background='#222228'; this.style.color='#9494a0';"
              onmouseout="this.style.background='#1c1c21'; this.style.color='#6b6b78';">
              Cancelar
            </button>
            <button type="submit" id="modal_submit"
              class="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer"
              style="background:#5b4f8a; color:#ece9f8; border:none;"
              onmouseover="this.style.background='#7c6fb5'"
              onmouseout="this.style.background='#5b4f8a'">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- ── Modal: Confirm delete ── -->
    <div id="delete_modal" class="hidden fixed inset-0 z-50 flex items-center justify-center px-4" style="background:rgba(0,0,0,0.7);">
      <div class="modal-enter w-full max-w-sm rounded-2xl p-6 flex flex-col gap-5" style="background:#16161a; border:1px solid #222228;">
        <div class="flex flex-col items-center text-center gap-3">
          <div class="w-12 h-12 rounded-full flex items-center justify-center" style="background:#2d1a1a;">
            <svg class="w-6 h-6" style="color:#e07070;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>
          </div>
          <h2 class="text-base font-bold" style="color:#e8e8ee;">Eliminar tarea</h2>
          <p class="text-sm" style="color:#6b6b78;">¿Estás seguro? Esta acción no se puede deshacer.</p>
        </div>
        <div class="flex gap-3">
          <button id="delete_cancel"
            class="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer"
            style="background:#1c1c21; border:1px solid #2a2a32; color:#6b6b78;"
            onmouseover="this.style.background='#222228'; this.style.color='#9494a0';"
            onmouseout="this.style.background='#1c1c21'; this.style.color='#6b6b78';">
            Cancelar
          </button>
          <button id="delete_confirm"
            class="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer"
            style="background:#5a2a2a; color:#e07070; border:none;"
            onmouseover="this.style.background='#7a3a3a'"
            onmouseout="this.style.background='#5a2a2a'">
            Eliminar
          </button>
        </div>
      </div>
    </div>
  `
}
