<script setup lang="ts">
import { computed } from 'vue'
import { useOutfitStore } from '@/stores/outfit'
import { useCalendarStore } from '@/stores/calendar'

const outfitStore = useOutfitStore()
const calendarStore = useCalendarStore()

const today = new Date().toISOString().slice(0, 10)

const leastUsed = computed(() => {
  const usageCount: Record<string, number> = {}

  // 1. Contamos usos pasados
  Object.entries(calendarStore.entries).forEach(([date, entry]) => {
    if (date <= today && entry.outfitId) {
      const id = typeof entry.outfitId === 'object' ? entry.outfitId._id : entry.outfitId
      usageCount[id] = (usageCount[id] || 0) + 1
    }
  })

  // 2. Mapeamos TODOS los outfits (incluyendo los de 0 usos)
  return (
    outfitStore.items
      .map((outfit) => ({
        ...outfit,
        timesUsed: usageCount[outfit._id] || 0,
      }))
      // 3. Ordenamos de MENOR a MAYOR
      .sort((a, b) => a.timesUsed - b.timesUsed)
      // 4. Tomamos los 4 que menos usas
      .slice(0, 4)
  )
})
</script>

<template>
  <div class="mb-8 mt-4">
    <div class="mb-5">
      <h2 class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">
        Prendas olvidadas
      </h2>
      <p class="text-xs text-gray-400">Atuendos que casi no han visto la luz del sol.</p>
    </div>

    <div v-if="leastUsed.length" class="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <div
        v-for="outfit in leastUsed"
        :key="outfit._id"
        class="bg-white border border-gray-100 rounded-2xl p-3 shadow-sm hover:border-orange-200 transition-all group"
      >
        <div
          class="h-24 rounded-xl mb-3 relative overflow-hidden flex items-center justify-center border border-gray-50"
          :style="{ background: outfit.mainColor ? outfit.mainColor + '10' : '#f9fafb' }"
        >
          <img v-if="outfit.imageUrl" :src="outfit.imageUrl" class="h-full object-contain p-1" />
          <span v-else class="text-xl opacity-30">🧥</span>

          <div
            class="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-lg border border-gray-100 shadow-sm"
          >
            <p
              class="text-[10px] font-black leading-none uppercase"
              :class="outfit.timesUsed === 0 ? 'text-orange-500' : 'text-gray-400'"
            >
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
              class="w-2 h-2 rounded-full"
              :style="{ background: outfit.mainColor || '#e5e7eb' }"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-else
      class="h-28 border-2 border-dashed border-gray-100 rounded-2xl flex items-center justify-center text-gray-300"
    >
      <p class="text-xs">No hay atuendos registrados</p>
    </div>
  </div>
</template>
