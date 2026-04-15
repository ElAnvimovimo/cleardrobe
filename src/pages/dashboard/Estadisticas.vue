<script setup lang="ts">
import { computed } from 'vue'
import { useOutfitStore } from '@/stores/outfit'
import { useClothingStore } from '@/stores/clothing'

const outfitStore = useOutfitStore()
const clothingStore = useClothingStore()

// ── Métricas Básicas ─────────────────────────────────────────────
const totalClothes = computed(() => clothingStore.items.length)
const totalOutfits = computed(() => outfitStore.items.length)

// ── Cálculo de Variedad ──────────────────────────────────────────
// La variedad es la relación entre atuendos y prendas.
// Un número alto significa que eres muy creativo con pocas prendas.
const varietyIndex = computed(() => {
  if (totalClothes.value === 0) return 0
  const ratio = (totalOutfits.value / totalClothes.value) * 10
  return Math.min(Math.round(ratio), 10) // Escala del 1 al 10
})

const varietyMessage = computed(() => {
  if (varietyIndex.value >= 8) return '¡Súper creativo!'
  if (varietyIndex.value >= 5) return 'Buen balance'
  return 'Falta combinar'
})

// ── Distribución por Categoría (Para el gráfico de barras) ────────
const categories = ['top', 'bottom', 'shoes', 'over']
const distribution = computed(() => {
  return categories.map((cat) => {
    const count = clothingStore.items.filter((i) => i.category === cat).length
    const percentage = totalClothes.value > 0 ? (count / totalClothes.value) * 100 : 0
    return { name: cat, count, percentage }
  })
})
</script>

<template>
  <div class="mb-8 mt-4">
    <div class="mb-5">
      <h2 class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">
        Resumen del Clóset
      </h2>
      <p class="text-xs text-gray-400">Análisis cuantitativo de tu guardarropa.</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      <div class="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
        <p class="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
          Total Prendas
        </p>
        <div class="flex items-end gap-2">
          <span class="text-3xl font-black text-gray-900">{{ totalClothes }}</span>
          <span class="text-xs text-gray-400 mb-1.5 font-medium">unidades</span>
        </div>
      </div>

      <div class="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
        <p class="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
          Atuendos Creados
        </p>
        <div class="flex items-end gap-2">
          <span class="text-3xl font-black text-purple-600">{{ totalOutfits }}</span>
          <span class="text-xs text-gray-400 mb-1.5 font-medium">combinaciones</span>
        </div>
      </div>

      <div
        class="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm relative overflow-hidden"
      >
        <p class="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
          Índice de Variedad
        </p>
        <div class="flex items-end gap-2">
          <span class="text-3xl font-black text-orange-500"
            >{{ varietyIndex }}<span class="text-lg">/10</span></span
          >
          <span
            class="text-[10px] bg-orange-50 text-orange-600 px-2 py-0.5 rounded-full mb-1.5 font-bold"
          >
            {{ varietyMessage }}
          </span>
        </div>
        <div class="absolute bottom-0 left-0 h-1 bg-orange-100 w-full">
          <div
            class="h-full bg-orange-400 transition-all duration-1000"
            :style="{ width: varietyIndex * 10 + '%' }"
          ></div>
        </div>
      </div>
    </div>

    <div class="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
      <h3 class="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-6">
        Distribución de Inventario
      </h3>
      <div class="space-y-5">
        <div v-for="cat in distribution" :key="cat.name">
          <div class="flex justify-between items-center mb-1.5">
            <span class="text-xs font-bold text-gray-700 capitalize">{{ cat.name }}</span>
            <span class="text-[10px] font-medium text-gray-400">{{ cat.count }} prendas</span>
          </div>
          <div class="w-full h-2 bg-gray-50 rounded-full overflow-hidden">
            <div
              class="h-full bg-purple-500 rounded-full transition-all duration-1000"
              :style="{ width: cat.percentage + '%' }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
