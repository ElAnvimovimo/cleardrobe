<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useClothingStore } from '@/stores/clothing'
import ClothingModal from '@/components/ClothingModal.vue'

const store      = useClothingStore()
const showModal  = ref(false)

onMounted(() => store.fetchAll())
</script>

<template>
  <div>
    <!-- Header -->
    <div class="flex justify-between items-center mb-5">
      <p class="text-sm text-gray-500">{{ store.items.length }} prendas</p>
      <button @click="showModal = true"
        class="bg-purple-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-purple-600">
        + Agregar prenda
      </button>
    </div>

    <!-- Loading -->
    <p v-if="store.loading" class="text-sm text-gray-400">Cargando...</p>

    <!-- Grid -->
    <div v-else-if="store.items.length" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
      <div v-for="item in store.items" :key="item._id"
        class="bg-white border border-gray-200 rounded-xl p-3">
        <div class="w-full h-28 rounded-lg mb-3 flex items-center justify-center"
          :style="{ background: item.mainColor + '33' }">
          <img v-if="item.imageUrl" :src="item.imageUrl" class="h-full object-contain rounded-lg"/>
          <span v-else class="text-2xl text-gray-300">?</span>
        </div>
        <p class="text-sm font-medium text-gray-800 truncate">{{ item.name }}</p>
        <p class="text-xs text-gray-400 mt-0.5">{{ item.material }}</p>
        <div class="flex justify-between items-center mt-2">
          <span class="text-xs px-2 py-0.5 rounded-full bg-purple-50 text-purple-700">
            {{ item.category }}
          </span>
          <button @click="store.remove(item._id)"
            class="text-xs text-gray-300 hover:text-red-400">
            eliminar
          </button>
        </div>
      </div>
    </div>

    <!-- Empty -->
    <div v-else class="flex flex-col items-center justify-center h-64 text-gray-300">
      <p class="text-sm">Tu armario está vacío</p>
      <button @click="showModal = true" class="mt-3 text-sm text-purple-400 hover:underline">
        Agrega tu primera prenda
      </button>
    </div>

    <!-- Modal -->
    <ClothingModal v-if="showModal" @close="showModal = false"/>
  </div>
</template>