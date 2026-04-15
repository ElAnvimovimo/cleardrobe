<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useUIStore } from '@/stores/ui'
import { useRouter } from 'vue-router'
import ClothingModal from '@/components/ClothingModal.vue'

const auth   = useAuthStore()
const ui     = useUIStore()
const router = useRouter()

const logout = () => {
  auth.logout()
  router.push('/login')
}
</script>

<template>
  <div class="flex h-screen overflow-hidden bg-gray-100 relative">

    <!-- Sidebar -->
    <aside class="w-52 min-w-52 bg-gray-50 border-r border-gray-200 flex flex-col">
      <div class="px-4 py-4 border-b border-gray-200">
        <span class="text-base font-semibold text-gray-900">Cleardrobe</span>
      </div>

      <nav class="flex flex-col py-2 flex-1">
        <p class="px-4 pt-3 pb-1 text-xs text-gray-400 uppercase tracking-wider">Principal</p>
        <RouterLink to="/dashboard"           end class="nav-item" active-class="nav-active">Estadísticas</RouterLink>
        <RouterLink to="/dashboard/armario"      class="nav-item" active-class="nav-active">Mi armario</RouterLink>
        <RouterLink to="/dashboard/atuendos"     class="nav-item" active-class="nav-active">Atuendos</RouterLink>
        <RouterLink to="/dashboard/calendario"   class="nav-item" active-class="nav-active">Calendario</RouterLink>

        <p class="px-4 pt-4 pb-1 text-xs text-gray-400 uppercase tracking-wider">Prendas</p>
        <RouterLink to="/dashboard/mas-usadas"   class="nav-item" active-class="nav-active">Más usadas</RouterLink>
        <RouterLink to="/dashboard/menos-usadas" class="nav-item" active-class="nav-active">Menos usadas</RouterLink>

        <!-- Botón agregar en sidebar -->
        <div class="px-3 mt-4">
          <button @click="ui.openClothingModal()"
            class="w-full bg-purple-500 hover:bg-purple-600 text-white text-xs rounded-lg py-2">
            + Agregar prenda
          </button>
        </div>
      </nav>

      <div class="px-4 py-4 border-t border-gray-200">
        <p class="text-xs text-gray-500 mb-2">{{ auth.user?.name }}</p>
        <button @click="logout" class="text-xs text-gray-400 hover:text-gray-700">
          Cerrar sesión
        </button>
      </div>
    </aside>

    <!-- Main -->
    <div class="flex flex-col flex-1 overflow-hidden">
      <header class="h-12 bg-white border-b border-gray-200 flex items-center justify-between px-5">
        <h1 class="text-sm font-medium text-gray-900">{{ $route.name }}</h1>
        <!-- Botón agregar en topbar -->
        <button @click="ui.openClothingModal()"
          class="bg-purple-500 hover:bg-purple-600 text-white text-xs px-3 py-1.5 rounded-lg">
          + Agregar prenda
        </button>
      </header>
      <main class="flex-1 overflow-auto p-5">
        <RouterView />
      </main>
    </div>

    <!-- Modal global — fuera del flujo de las vistas -->
    <ClothingModal v-if="ui.showClothingModal" @close="ui.closeClothingModal()"/>

  </div>
</template>

<style scoped>
.nav-item {
  display: flex;
  align-items: center;
  padding: 7px 16px;
  font-size: 13px;
  color: #6b7280;
  transition: background .15s;
  border-left: 2px solid transparent;
}
.nav-item:hover { background: white; color: #111827; }
.nav-active {
  background: white;
  color: #111827;
  font-weight: 500;
  border-left: 2px solid #7F77DD;
}
</style>