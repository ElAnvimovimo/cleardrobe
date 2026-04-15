<script setup lang="ts">
import { ref } from 'vue'
import { CATEGORIES, MATERIALS, SEASONS, TAGS } from '@/constants/clothing'
import { useClothingStore } from '@/stores/clothing'

const emit  = defineEmits(['close'])
const store = useClothingStore()

const COLORS = ['#FFFFFF', '#222222', '#C4C4C4', '#F5D547', '#3B3BBF', '#E8E8E8']

const form = ref({
  name:      '',
  category:  '',
  material:  '',
  mainColor: '#FFFFFF',
  seasons:   [] as string[],
  tags:      [] as string[],
  imageUrl:  '',
})

const loading = ref(false)
const error   = ref('')

const toggleSeason = (seasonValue: string) => {
  const index = form.value.seasons.indexOf(seasonValue)
  if (index > -1) {
    form.value.seasons.splice(index, 1)
  } else {
    form.value.seasons.push(seasonValue)
  }
}

const submit = async () => {
  console.log('Submit llamado')
  console.log('Form:', form.value)
  if (!form.value.name || !form.value.category) {
    error.value = 'Nombre y categoría son requeridos'
    console.log('Validación fallida')
    return
  }
  try {
    loading.value = true
    console.log('Llamando store.create')
    await store.create(form.value)
    emit('close')
  } catch (e) {
    console.log('Error en submit:', e)
    error.value = 'Error al guardar la prenda'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div
    class="fixed inset-0 flex items-center justify-center z-50"
    style="background: rgba(0,0,0,0.45)"
    @click.self="emit('close')"
  >
    <div class="bg-white rounded-2xl w-full max-w-md mx-4 p-7 shadow-xl">

      <div class="flex justify-between items-start mb-5">
        <div>
          <h2 class="text-xl font-bold text-gray-900">Añadir Nueva Prenda</h2>
          <p class="text-xs text-gray-400 mt-0.5">Agrega y selecciona lo que se ajuste a tu prenda.</p>
        </div>
        <button @click="emit('close')" class="text-gray-300 hover:text-gray-500 text-2xl leading-none mt-1">&times;</button>
      </div>

      <p v-if="error" class="text-xs text-red-500 mb-3 font-medium">{{ error }}</p>

      <div class="space-y-5">

        <div>
          <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Nombre de la prenda</label>
          <input
            v-model="form.name"
            type="text"
            placeholder="Ej: Camiseta blanca de algodón"
            class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-purple-400 placeholder-gray-300"
          />
        </div>

        <div class="flex gap-4 items-end">
          <div class="flex-1">
            <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Categoría</label>
            <div class="relative">
              <select
                v-model="form.category"
                class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-purple-400 appearance-none bg-white"
              >
                <option value="" disabled>Seleccionar categoría</option>
                <option v-for="c in CATEGORIES" :key="c.value" :value="c.value">{{ c.label }}</option>
              </select>
              <span class="absolute right-3 top-3 text-gray-300 pointer-events-none">&#8964;</span>
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Color</label>
            <div class="flex gap-1.5 items-center">
              <button
                v-for="color in COLORS"
                :key="color"
                @click="form.mainColor = color"
                class="w-8 h-8 rounded-full border-2 transition-all"
                :style="{
                  background: color,
                  borderColor: form.mainColor === color ? '#7F77DD' : '#e5e7eb'
                }"
              />

              <label
                class="w-8 h-8 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-purple-400 transition-all relative"
                :style="!COLORS.includes(form.mainColor) ? { background: form.mainColor, borderColor: '#7F77DD' } : {}"
              >
                <span
                  class="text-lg leading-none"
                  :style="!COLORS.includes(form.mainColor) ? { color: 'transparent' } : { color: '#9ca3af' }"
                >+</span>
                <input
                  type="color"
                  v-model="form.mainColor"
                  class="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                />
              </label>
            </div>
          </div>
        </div>

        <div>
          <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Material</label>
          <div class="relative">
            <select
              v-model="form.material"
              class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-purple-400 appearance-none bg-white"
            >
              <option value="" disabled>Seleccionar material</option>
              <option v-for="m in MATERIALS" :key="m" :value="m">{{ m }}</option>
            </select>
            <span class="absolute right-3 top-3 text-gray-300 pointer-events-none">&#8964;</span>
          </div>
        </div>

        <div>
          <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Temporadas</label>
          <div class="flex gap-2 flex-wrap">
            <button
              v-for="s in SEASONS"
              :key="s.value"
              @click="toggleSeason(s.value)"
              class="px-4 py-1.5 rounded-full text-sm border transition-all"
              :class="form.seasons.includes(s.value)
                ? 'bg-purple-600 text-white border-purple-600'
                : 'bg-white text-gray-600 border-gray-200 hover:border-purple-300'"
            >
              {{ s.label }}
            </button>
          </div>
        </div>

        <div>
          <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
            URL de la Imagen <span class="text-gray-300 normal-case font-normal">(opcional)</span>
          </label>
          <input
            v-model="form.imageUrl"
            type="url"
            placeholder="https://..."
            class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-purple-400 placeholder-gray-300"
          />
        </div>

      </div>

      <div class="flex gap-3 mt-7">
        <button
          @click="emit('close')"
          class="flex-1 py-2.5 rounded-xl text-sm text-gray-500 hover:bg-gray-50 border border-gray-200"
        >
          Cancelar
        </button>
        <button
          @click="submit"
          :disabled="loading"
          class="flex-1 py-2.5 rounded-xl text-sm text-white bg-gray-900 hover:bg-gray-700 disabled:opacity-50 transition-colors"
        >
          {{ loading ? 'Guardando...' : 'Añadir al Armario' }}
        </button>
      </div>

    </div>
  </div>
</template>