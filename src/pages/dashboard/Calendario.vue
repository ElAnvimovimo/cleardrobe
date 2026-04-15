<script setup lang="ts">
import { onMounted, ref, computed, watch } from 'vue'
import { useOutfitStore } from '@/stores/outfit'
import { useCalendarStore } from '@/stores/calendar'

const outfitStore   = useOutfitStore()
const calendarStore = useCalendarStore()

// ── Calendar state ───────────────────────────────────────────────
const today   = new Date()
const current = ref(new Date(today.getFullYear(), today.getMonth(), 1))

const currentMonth = computed(() => {
  const y = current.value.getFullYear()
  const m = String(current.value.getMonth() + 1).padStart(2, '0')
  return `${y}-${m}`
})

const monthName = computed(() =>
  current.value.toLocaleString('es-MX', { month: 'long', year: 'numeric' })
)

const prevMonth = () =>
  current.value = new Date(current.value.getFullYear(), current.value.getMonth() - 1, 1)

const nextMonth = () =>
  current.value = new Date(current.value.getFullYear(), current.value.getMonth() + 1, 1)

// Recargar al cambiar de mes
watch(currentMonth, (month) => calendarStore.fetchMonth(month))

onMounted(() => {
  outfitStore.fetchAll()
  calendarStore.fetchMonth(currentMonth.value)
})

// ── Days grid ────────────────────────────────────────────────────
const days = computed(() => {
  const year  = current.value.getFullYear()
  const month = current.value.getMonth()
  const first = new Date(year, month, 1).getDay()
  const total = new Date(year, month + 1, 0).getDate()
  const cells: Array<{ day: number | null; date: string | null }> = []
  
  for (let i = 0; i < first; i++) cells.push({ day: null, date: null })
  
  for (let d = 1; d <= total; d++) {
    const mm = String(month + 1).padStart(2, '0')
    const dd = String(d).padStart(2, '0')
    cells.push({ day: d, date: `${year}-${mm}-${dd}` })
  }
  return cells
})

const isToday = (date: string | null) =>
  date === today.toISOString().slice(0, 10)

const DAYS_SHORT = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']

// ── Cell click: toggle o abrir picker ───────────────────────────
const handleCellClick = (date: string | null) => {
  if (!date) return
  if (calendarStore.entries[date]) {
    // Ya tiene outfit → eliminar
    calendarStore.remove(date)
  } else {
    // Vacío → abrir picker
    openPicker(date)
  }
}

// ── Picker modal ─────────────────────────────────────────────────
const pickerDate = ref<string | null>(null)
const showPicker = ref(false)

const openPicker = (date: string) => {
  pickerDate.value = date
  showPicker.value = true
}

const assignOutfit = (outfit: any) => {
  if (pickerDate.value) {
    calendarStore.assign(pickerDate.value, outfit._id, outfit)
  }
  showPicker.value = false
  pickerDate.value = null
}

const formatPickerDate = computed(() => {
  if (!pickerDate.value) return ''
  
  const parts = pickerDate.value.split('-')
  
  if (parts.length !== 3) return ''

  const y = parts[0]!
  const m = parts[1]!
  const d = parts[2]!

  return new Date(+y, +m - 1, +d).toLocaleDateString('es-MX', {
    weekday: 'long', 
    day: 'numeric', 
    month: 'long'
  })
})

// Outfit resuelto de una entrada (el populate devuelve outfitId como objeto)
const getOutfit = (date: string) => {
  const entry = calendarStore.entries[date]
  if (!entry) return null
  return entry.outfitId ?? null
}
</script>

<template>
  <div>
    <div class="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">

      <div class="flex items-center justify-between mb-4">
        <button @click="prevMonth"
          class="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-all">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8l4-4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <h2 class="text-sm font-semibold text-gray-700 capitalize">{{ monthName }}</h2>
        <button @click="nextMonth"
          class="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-all">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>

      <div class="grid grid-cols-7 mb-1">
        <span v-for="dayLabel in DAYS_SHORT" :key="dayLabel"
          class="text-center text-xs font-semibold text-gray-400 uppercase tracking-wider py-1">
          {{ dayLabel }}
        </span>
      </div>

      <p v-if="calendarStore.loading" class="text-sm text-gray-400 text-center py-8">Cargando...</p>

      <div v-else class="grid grid-cols-7 gap-1">
        <div
          v-for="(cell, idx) in days"
          :key="idx"
          class="min-h-[72px] rounded-xl p-1.5 flex flex-col gap-1 transition-all border border-transparent"
          :class="{
            'cursor-pointer hover:bg-purple-50 hover:border-purple-200': cell.day,
            'bg-purple-50 !border-purple-200': isToday(cell.date),
            'bg-gray-50': cell.date && calendarStore.entries[cell.date],
          }"
          @click="handleCellClick(cell.date)"
        >
          <template v-if="cell.day">
            <span class="text-xs font-semibold leading-none"
              :class="isToday(cell.date) ? 'text-purple-600' : 'text-gray-500'">
              {{ cell.day }}
            </span>

            <div v-if="cell.date && getOutfit(cell.date)"
              class="flex-1 bg-purple-100 rounded-lg px-1.5 py-1 flex flex-col justify-between min-h-0"
              title="Click para eliminar">
              <p class="text-[10px] font-medium text-purple-700 leading-tight line-clamp-2">
                {{ getOutfit(cell.date)?.name }}
              </p>
              <span class="text-purple-300 text-xs self-end leading-none mt-1">×</span>
            </div>

            <div v-else class="flex-1 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <span class="text-gray-300 text-lg leading-none">+</span>
            </div>
          </template>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <Transition name="fade">
        <div v-if="showPicker"
          class="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40"
          @click.self="showPicker = false">

          <div class="bg-white rounded-t-2xl sm:rounded-2xl w-full max-w-sm mx-0 sm:mx-4 p-6 shadow-xl max-h-[80vh] overflow-y-auto">

            <div class="flex justify-between items-start mb-5">
              <div>
                <p class="text-xs text-gray-400 capitalize mb-0.5">{{ formatPickerDate }}</p>
                <h3 class="text-base font-bold text-gray-900">Elige un atuendo</h3>
              </div>
              <button @click="showPicker = false"
                class="w-7 h-7 flex items-center justify-center rounded-lg bg-gray-100 text-gray-500 hover:bg-gray-200 text-lg leading-none">
                ×
              </button>
            </div>

            <div v-if="!outfitStore.items.length"
              class="flex flex-col items-center justify-center py-10 text-gray-300">
              <p class="text-sm">No tienes atuendos guardados</p>
            </div>

            <div v-else class="flex flex-col gap-2">
              <button
                v-for="outfit in outfitStore.items"
                :key="outfit._id"
                @click="assignOutfit(outfit)"
                class="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-purple-200 hover:bg-purple-50 transition-all text-left w-full">
                <div class="w-9 h-9 rounded-lg flex-shrink-0"
                  :style="{ background: outfit.mainColor ? outfit.mainColor + '55' : '#e9d5ff' }"/>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-semibold text-gray-800 truncate">{{ outfit.name }}</p>
                  <p class="text-xs text-gray-400 mt-0.5 capitalize">
                    {{ outfit.occasion }} · {{ outfit.season }}
                  </p>
                </div>
                <svg class="text-gray-300 flex-shrink-0" width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>

          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity .2s; }
.fade-enter-from, .fade-leave-to       { opacity: 0; }
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>