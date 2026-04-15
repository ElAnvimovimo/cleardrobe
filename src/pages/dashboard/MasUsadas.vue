<script setup lang="ts">
import { computed } from 'vue'
import { useOutfitStore } from '@/stores/outfit'
import { useCalendarStore } from '@/stores/calendar'

const outfitStore = useOutfitStore()
const calendarStore = useCalendarStore()

// Obtenemos la fecha de hoy para comparar (YYYY-MM-DD)
const today = new Date().toISOString().slice(0, 10)

const mostUsed = computed(() => {
  const usageCount: Record<string, number> = {}

  // 1. Recorremos el calendario para contar cuántas veces se usó cada prenda
  // Solo contamos si la fecha es de hoy o del pasado
  Object.entries(calendarStore.entries).forEach(([date, entry]) => {
    if (date <= today && entry.outfitId) {
      // Manejamos si el ID viene como objeto (populate) o string
      const id = typeof entry.outfitId === 'object' ? entry.outfitId._id : entry.outfitId
      usageCount[id] = (usageCount[id] || 0) + 1
    }
  })

  // 2. Cruzamos con los datos del store y ordenamos
  return outfitStore.items
    .map((outfit) => ({
      ...outfit,
      timesUsed: usageCount[outfit._id] || 0,
    }))
    .filter((outfit) => outfit.timesUsed > 0) // Solo mostramos los que tienen al menos 1 uso
    .sort((a, b) => b.timesUsed - a.timesUsed) // De mayor a menor
    .slice(0, 4) // Mostramos el top 4
})
</script>

<template>
  <div class="mb-8 mt-4">
    <div class="mb-5">
      <h2 class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">
        Análisis de uso
      </h2>
      <p class="text-xs text-gray-400">Tus atuendos más utilizados hasta el día de hoy.</p>
    </div>

    <div v-if="mostUsed.length" class="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <div
        v-for="outfit in mostUsed"
        :key="outfit._id"
        class="bg-white border border-gray-100 rounded-2xl p-3 shadow-sm hover:border-purple-200 transition-all group"
      >
        <div
          class="h-24 bg-gray-50 rounded-xl mb-3 relative overflow-hidden flex items-center justify-center border border-gray-50"
          :style="{ background: outfit.mainColor ? outfit.mainColor + '15' : '#f9fafb' }"
        >
          <img v-if="outfit.imageUrl" :src="outfit.imageUrl" class="h-full object-contain p-1" />
          <span v-else class="text-xl opacity-30">👕</span>

          <div
            class="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-lg border border-purple-100 shadow-sm"
          >
            <p class="text-[10px] font-black text-purple-600 leading-none uppercase">
              {{ outfit.timesUsed }} usos
            </p>
          </div>
        </div>

        <div class="px-1">
          <p class="text-xs font-bold text-gray-800 truncate mb-1">{{ outfit.name }}</p>
          <div class="flex items-center justify-between">
            <span class="text-[10px] text-gray-400 capitalize bg-gray-50 px-1.5 py-0.5 rounded-md">
              {{ outfit.occasion }}
            </span>
            <div
              class="w-2 h-2 rounded-full shadow-sm"
              :style="{ background: outfit.mainColor || '#e5e7eb' }"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-else
      class="h-28 border-2 border-dashed border-gray-100 rounded-2xl flex flex-col items-center justify-center text-gray-300"
    >
      <p class="text-xs">Usa tu calendario para generar estadísticas</p>
    </div>
  </div>
</template>
