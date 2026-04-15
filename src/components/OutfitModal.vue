<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { SEASONS } from '@/constants/clothing'
import { useOutfitStore } from '@/stores/outfit'
import { useClothingStore } from '@/stores/clothing'
import ClothingPicker from './ClothingPicker.vue'

const emit = defineEmits(['close'])
const store = useOutfitStore()
const clothingStore = useClothingStore()

onMounted(() => clothingStore.fetchAll())

const activePicker = ref<string | null>(null)

const form = ref({
  name:     '',
  occasion: '',
  season:   '',
  slots: {
    head:   null as any,
    top:    null as any,
    over:   null as any,
    bottom: null as any,
    shoes:  null as any,
    acc:    [] as any[],
  }
})

const pickerItems = computed(() => {
  if (!activePicker.value) return []
  if (activePicker.value === 'acc') {
    return clothingStore.items.filter(i => i.category.startsWith('acc_'))
  }
  return clothingStore.items.filter(i => i.category === activePicker.value)
})

const selectClothing = (item: any) => {
  if (activePicker.value === 'acc') {
    if (!form.value.slots.acc.find((a: any) => a._id === item._id)) {
      form.value.slots.acc.push(item)
    }
  } else {
    (form.value.slots as any)[activePicker.value!] = item
  }
  activePicker.value = null
}

const removeAcc = (id: string) => {
  form.value.slots.acc = form.value.slots.acc.filter((a: any) => a._id !== id)
}

const loading = ref(false)
const error   = ref('')

const submit = async () => {
  if (!form.value.name || !form.value.occasion || !form.value.season) {
    error.value = 'Nombre, ocasión y temporada son requeridos'
    return
  }
  try {
    loading.value = true
    await store.create({
      ...form.value,
      slots: {
        head:   form.value.slots.head?._id   || null,
        top:    form.value.slots.top?._id    || null,
        over:   form.value.slots.over?._id   || null,
        bottom: form.value.slots.bottom?._id || null,
        shoes:  form.value.slots.shoes?._id  || null,
        acc:    form.value.slots.acc.map((a: any) => a._id),
      }
    })
    emit('close')
  } catch {
    error.value = 'Error al guardar el atuendo'
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
    <div class="bg-white rounded-2xl w-full max-w-lg mx-4 p-7 shadow-xl max-h-[90vh] overflow-y-auto">

      <!-- Header -->
      <div class="flex justify-between items-start mb-5">
        <div>
          <h2 class="text-xl font-bold text-gray-900">Nuevo atuendo</h2>
          <p class="text-xs text-gray-400 mt-0.5">Combina tus prendas en un outfit.</p>
        </div>
        <button @click="emit('close')" class="text-gray-300 hover:text-gray-500 text-2xl leading-none">&times;</button>
      </div>

      <p v-if="error" class="text-xs text-red-400 mb-3 bg-red-50 px-3 py-2 rounded-lg">{{ error }}</p>

      <!-- Picker activo -->
      <ClothingPicker
        v-if="activePicker"
        :items="pickerItems"
        :category="activePicker"
        @select="selectClothing"
        @back="activePicker = null"
      />

      <!-- Formulario -->
      <div v-else class="space-y-5">

        <!-- Nombre -->
        <div>
          <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Nombre</label>
          <input v-model="form.name" type="text" placeholder="Ej: Look de lunes"
            class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-purple-400 placeholder-gray-300"/>
        </div>

        <!-- Ocasión + Temporada -->
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Ocasión</label>
            <select v-model="form.occasion"
              class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-purple-400 appearance-none bg-white">
              <option value="" disabled>Selecciona</option>
              <option value="casual">Casual</option>
              <option value="formal">Formal</option>
              <option value="trabajo">Trabajo</option>
              <option value="fiesta">Fiesta</option>
              <option value="playa">Playa</option>
              <option value="casa">Casa</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Temporada</label>
            <select v-model="form.season"
              class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-purple-400 appearance-none bg-white">
              <option value="" disabled>Selecciona</option>
              <option v-for="s in SEASONS" :key="s.value" :value="s.value">{{ s.label }}</option>
            </select>
          </div>
        </div>

        <!-- Slots -->
        <div>
          <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Prendas</label>
          <div class="grid grid-cols-3 gap-2">

            <div v-for="slot in ['head','top','over','bottom','shoes']" :key="slot">
              <p class="text-xs text-gray-400 mb-1 capitalize">{{ slot }}</p>
              <!-- Slot vacío -->
              <div v-if="!form.slots[slot as keyof typeof form.slots] || slot === 'acc'"
                @click="activePicker = slot"
                class="h-20 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center cursor-pointer hover:border-purple-400 transition-all">
                <span class="text-gray-300 text-xl">+</span>
              </div>
              <!-- Slot lleno -->
              <div v-else
                class="h-20 border border-gray-200 rounded-xl p-2 relative"
                :style="{ background: (form.slots as any)[slot]?.mainColor + '22' }">
                <p class="text-xs font-medium text-gray-700 truncate">{{ (form.slots as any)[slot]?.name }}</p>
                <button @click="(form.slots as any)[slot] = null"
                  class="absolute top-1 right-1 text-gray-300 hover:text-red-400 text-xs">×</button>
              </div>
            </div>

            <!-- Slot acc -->
            <div>
              <p class="text-xs text-gray-400 mb-1">Accesorios</p>
              <div @click="activePicker = 'acc'"
                class="h-20 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center cursor-pointer hover:border-purple-400 transition-all">
                <span class="text-gray-300 text-xs text-center px-1">
                  {{ form.slots.acc.length ? `${form.slots.acc.length} selec.` : '+' }}
                </span>
              </div>
            </div>

          </div>

          <!-- Accesorios seleccionados -->
          <div v-if="form.slots.acc.length" class="flex flex-wrap gap-2 mt-2">
            <span v-for="a in form.slots.acc" :key="a._id"
              class="text-xs bg-purple-50 text-purple-600 px-2 py-1 rounded-full flex items-center gap-1">
              {{ a.name }}
              <button @click="removeAcc(a._id)" class="hover:text-red-400">×</button>
            </span>
          </div>
        </div>

        <!-- Botones -->
        <div class="flex gap-3 mt-2">
          <button @click="emit('close')"
            class="flex-1 py-2.5 rounded-xl text-sm text-gray-500 hover:bg-gray-50 border border-gray-200">
            Cancelar
          </button>
          <button @click="submit" :disabled="loading"
            class="flex-1 py-2.5 rounded-xl text-sm text-white bg-gray-900 hover:bg-gray-700 disabled:opacity-50">
            {{ loading ? 'Guardando...' : 'Guardar atuendo' }}
          </button>
        </div>

      </div>
    </div>
  </div>
</template>