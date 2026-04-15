<template>
  <header>
    <nav class="px-4 lg:px-6 py-3 bg-purple-500">
      <div class="flex justify-between items-center mx-auto max-w-screen-xl">
        <RouterLink to="/" class="flex items-center gap-2">
          <img src="/assets/carita.png" class="h-8" alt="ClearDrobe Logo"/>
          <span class="text-white text-lg font-semibold">ClearDrobe</span>
        </RouterLink>
        <div class="flex items-center gap-2">
          <RouterLink
            to="/login"
            class="text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-purple-400 transition-colors"
          >
            Iniciar sesión
          </RouterLink>
          <RouterLink
            to="/register"
            class="text-purple-600 bg-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-purple-50 transition-colors"
          >
            Registrarse
          </RouterLink>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts"></script>