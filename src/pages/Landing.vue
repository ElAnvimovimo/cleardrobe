<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <div class="min-h-screen bg-white">

    <!-- Nav -->
    <nav class="flex justify-between items-center px-8 py-4 border-b border-gray-100">
      <div class="flex items-center gap-2">
        <img src="/assets/carita.png" class="h-7" alt="logo"/>
        <span class="font-semibold text-gray-900 text-sm">Cleardrobe</span>
      </div>
      <div class="flex items-center gap-3">
        <button @click="router.push('/login')"
          class="text-sm text-gray-500 hover:text-gray-900 px-4 py-2 transition-colors">
          Login
        </button>
        <button @click="router.push('/register')"
          class="text-sm text-white bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition-colors">
          Sign Up
        </button>
      </div>
    </nav>

    <!-- Hero -->
    <section class="max-w-screen-xl mx-auto px-8 pt-20 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div>
        <span class="text-xs font-semibold uppercase tracking-widest text-purple-400 bg-purple-50 px-3 py-1 rounded-full">
          Tu armario digital
        </span>
        <h1 class="mt-5 text-6xl font-bold text-gray-900 leading-none tracking-tight">
          Tu armario,<br/>
          <span class="text-purple-500">tu estilo.</span>
        </h1>
        <p class="mt-6 text-gray-400 text-lg leading-relaxed max-w-md">
          Organiza, combina y descubre tu guardarropa con precisión editorial. Un espacio sofisticado para tu estilo personal.
        </p>
        <div class="flex gap-3 mt-8">
          <button @click="router.push('/register')"
            class="bg-gray-900 hover:bg-gray-700 text-white text-sm font-medium px-6 py-3 rounded-xl transition-colors">
            Comenzar
          </button>
          <button @click="router.push('/login')"
            class="border border-gray-200 hover:border-gray-300 text-gray-600 text-sm font-medium px-6 py-3 rounded-xl transition-colors">
            Iniciar sesión
          </button>
        </div>
      </div>

      <!-- Hero visual -->
      <div class="relative hidden lg:flex justify-end gap-4 items-end">
        <div class="w-48 h-64 bg-purple-100 rounded-2xl flex items-center justify-center">
          <svg class="w-16 h-16 text-purple-300" fill="none" stroke="currentColor" stroke-width="1" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 3v1m6-1v1M5 7h14l-1 13H6L5 7zm4 4v6m6-6v6"/>
          </svg>
        </div>
        <div class="w-36 h-48 bg-gray-900 rounded-2xl flex items-center justify-center mb-8">
          <svg class="w-12 h-12 text-gray-600" fill="none" stroke="currentColor" stroke-width="1" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 3c-1.5 0-3 1-3 2.5V7H6l-1 14h14L18 7h-3V5.5C15 4 13.5 3 12 3z"/>
          </svg>
        </div>
        <div class="w-40 h-56 bg-purple-500 rounded-2xl flex items-center justify-center">
          <svg class="w-14 h-14 text-purple-200" fill="none" stroke="currentColor" stroke-width="1" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
          </svg>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="bg-gray-50 py-20">
      <div class="max-w-screen-xl mx-auto px-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Todo lo que necesitas</h2>
        <p class="text-gray-400 text-sm mb-12">Cada función está diseñada para respetar el arte de vestir.</p>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

          <div class="bg-white rounded-2xl p-6 border border-gray-100">
            <div class="w-9 h-9 bg-purple-50 rounded-xl flex items-center justify-center mb-4">
              <svg class="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h12A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6z"/>
              </svg>
            </div>
            <h3 class="text-sm font-semibold text-gray-800 mb-1">Mi armario</h3>
            <p class="text-xs text-gray-400 leading-relaxed">Registra cada prenda con color, material, temporada y categoría.</p>
          </div>

          <div class="bg-white rounded-2xl p-6 border border-gray-100">
            <div class="w-9 h-9 bg-purple-50 rounded-xl flex items-center justify-center mb-4">
              <svg class="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"/>
              </svg>
            </div>
            <h3 class="text-sm font-semibold text-gray-800 mb-1">Atuendos</h3>
            <p class="text-xs text-gray-400 leading-relaxed">Combina prendas en outfits por ocasión, temporada y estado de ánimo.</p>
          </div>

          <div class="bg-white rounded-2xl p-6 border border-gray-100">
            <div class="w-9 h-9 bg-purple-50 rounded-xl flex items-center justify-center mb-4">
              <svg class="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5"/>
              </svg>
            </div>
            <h3 class="text-sm font-semibold text-gray-800 mb-1">Calendario</h3>
            <p class="text-xs text-gray-400 leading-relaxed">Registra qué atuendo usaste cada día y planea los próximos.</p>
          </div>

          <div class="bg-white rounded-2xl p-6 border border-gray-100">
            <div class="w-9 h-9 bg-purple-50 rounded-xl flex items-center justify-center mb-4">
              <svg class="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"/>
              </svg>
            </div>
            <h3 class="text-sm font-semibold text-gray-800 mb-1">Estadísticas</h3>
            <p class="text-xs text-gray-400 leading-relaxed">Descubre qué prendas usas más y cuáles llevan meses sin salir.</p>
          </div>

        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="max-w-screen-xl mx-auto px-8 py-24 text-center">
      <h2 class="text-4xl font-bold text-gray-900 mb-4">¿Listo para ordenar tu armario?</h2>
      <p class="text-gray-400 mb-8">Empieza gratis, sin tarjeta de crédito.</p>
      <button @click="router.push('/register')"
        class="bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium px-8 py-3 rounded-xl transition-colors">
        Crear cuenta gratis
      </button>
    </section>

    <!-- Footer -->
    <footer class="border-t border-gray-100 py-6 text-center text-xs text-gray-300">
      Cleardrobe © 2025
    </footer>

  </div>
</template>