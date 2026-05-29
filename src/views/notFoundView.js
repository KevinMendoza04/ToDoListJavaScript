export default function notFoundView() {
  return `
    <div class="min-h-screen flex flex-col items-center justify-center px-4"
      style="background:#111114; font-family:'Inter',sans-serif;">
      <div class="text-center">
        <p class="text-8xl font-extrabold tracking-tight" style="color:#2e2645;">404</p>
        <h1 class="text-2xl font-bold mt-4" style="color:#e8e8ee;">Página no encontrada</h1>
        <p class="text-sm mt-2 mb-8" style="color:#4a4a55;">La ruta que buscas no existe o fue movida.</p>
        <a
          href="#home"
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
          style="background:#5b4f8a; color:#ece9f8;"
          onmouseover="this.style.background='#7c6fb5'"
          onmouseout="this.style.background='#5b4f8a'"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
          </svg>
          Volver al inicio
        </a>
      </div>
    </div>
  `
}
