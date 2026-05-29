export default function loginView() {
  return `
    <div class="min-h-screen w-full grid grid-cols-1 md:grid-cols-2" style="background:#111114; font-family:'Inter',sans-serif;">

      <!-- ── Left panel: form ── -->
      <div class="flex items-center justify-center px-8 py-12" style="background:#111114;">
        <div class="w-full max-w-sm">

          <!-- Brand -->
          <div class="mb-10">
            <div class="inline-flex items-center gap-3 mb-6">
              <div class="w-9 h-9 rounded-xl flex items-center justify-center" style="background:#2e2645;">
                <svg class="w-5 h-5" style="color:#a096d4;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                </svg>
              </div>
              <span class="text-xl font-bold tracking-tight" style="color:#e8e8ee;">Todo App</span>
            </div>
            <h1 class="text-3xl font-bold mb-2 leading-tight" style="color:#e8e8ee;">Bienvenido de nuevo</h1>
            <p class="text-sm font-normal" style="color:#6b6b78;">Inicia sesión para gestionar tus tareas</p>
          </div>

          <!-- Form -->
          <form id="loginForm" class="flex flex-col gap-5">

            <!-- Error box -->
            <div id="login_error"
              class="hidden rounded-xl px-4 py-3 text-sm font-medium"
              style="background:#2d1a1a; border:1px solid #5a2a2a; color:#e07070;">
            </div>

            <!-- Email -->
            <div class="flex flex-col gap-2">
              <label for="email" class="text-xs font-semibold uppercase tracking-widest" style="color:#6b6b78;">
                Correo electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="usuario@mail.com"
                required
                class="w-full rounded-xl px-4 py-3 text-sm font-normal outline-none transition-all"
                style="
                  background:#1c1c21;
                  border:1px solid #2a2a32;
                  color:#e8e8ee;
                  caret-color:#a096d4;
                "
                onfocus="this.style.borderColor='#5b4f8a'; this.style.boxShadow='0 0 0 3px rgba(91,79,138,0.15)'"
                onblur="this.style.borderColor='#2a2a32'; this.style.boxShadow='none'"
              />
            </div>

            <!-- Password -->
            <div class="flex flex-col gap-2">
              <label for="password" class="text-xs font-semibold uppercase tracking-widest" style="color:#6b6b78;">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="••••••••"
                required
                class="w-full rounded-xl px-4 py-3 text-sm font-normal outline-none transition-all"
                style="
                  background:#1c1c21;
                  border:1px solid #2a2a32;
                  color:#e8e8ee;
                  caret-color:#a096d4;
                "
                onfocus="this.style.borderColor='#5b4f8a'; this.style.boxShadow='0 0 0 3px rgba(91,79,138,0.15)'"
                onblur="this.style.borderColor='#2a2a32'; this.style.boxShadow='none'"
              />
            </div>

            <!-- Submit -->
            <button
              id="btnLogin"
              type="submit"
              class="w-full rounded-xl py-3 text-sm font-semibold tracking-wide transition-all cursor-pointer mt-1"
              style="background:#5b4f8a; color:#ece9f8; border:none;"
              onmouseover="this.style.background='#7c6fb5'"
              onmouseout="this.style.background='#5b4f8a'"
            >
              Iniciar sesión
            </button>

          </form>
        </div>
      </div>

      <!-- ── Right panel: universe image ── -->
      <div class="hidden md:block relative overflow-hidden">
        <!-- Background image -->
        <img
          src="https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=1200&q=85&fit=crop"
          alt="Universe with stars and constellations"
          class="absolute inset-0 w-full h-full object-cover"
          style="filter: brightness(0.55) saturate(0.8);"
        />

        <!-- Overlay gradient -->
        <div class="absolute inset-0" style="background: linear-gradient(135deg, rgba(13,13,15,0.6) 0%, rgba(30,20,50,0.4) 100%);"></div>

        <!-- Content over image -->
        <div class="relative z-10 flex flex-col justify-end h-full p-10">
          <div class="mb-8">
            <h2 class="text-3xl font-bold mb-3 leading-tight" style="color:#ece9f8;">
              Organiza tu universo
            </h2>
            <p class="text-sm font-normal leading-relaxed max-w-xs" style="color:#c2c2cc;">
              Cada tarea es una estrella en tu constelación. Gestiona, prioriza y completa lo que importa.
            </p>
          </div>

          <!-- Feature pills -->
          <div class="flex flex-col gap-2.5">
            <div class="inline-flex items-center gap-3 px-4 py-3 rounded-xl backdrop-blur-sm w-fit"
              style="background:rgba(255,255,255,0.07); border:1px solid rgba(255,255,255,0.1);">
              <span class="w-2 h-2 rounded-full" style="background:#5aab6a;"></span>
              <span class="text-sm font-medium" style="color:#e8e8ee;">Crea y organiza tareas</span>
            </div>
            <div class="inline-flex items-center gap-3 px-4 py-3 rounded-xl backdrop-blur-sm w-fit"
              style="background:rgba(255,255,255,0.07); border:1px solid rgba(255,255,255,0.1);">
              <span class="w-2 h-2 rounded-full" style="background:#c9a84c;"></span>
              <span class="text-sm font-medium" style="color:#e8e8ee;">Filtra por estado o usuario</span>
            </div>
            <div class="inline-flex items-center gap-3 px-4 py-3 rounded-xl backdrop-blur-sm w-fit"
              style="background:rgba(255,255,255,0.07); border:1px solid rgba(255,255,255,0.1);">
              <span class="w-2 h-2 rounded-full" style="background:#a096d4;"></span>
              <span class="text-sm font-medium" style="color:#e8e8ee;">Roles Admin y User</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  `
}
