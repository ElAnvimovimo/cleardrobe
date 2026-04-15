<script setup lang="ts">
defineProps<{
  items: any[]
  category: string
}>()

defineEmits(['select', 'back'])
</script>

<template>
  <div>
    <!-- Header -->
    <div class="flex items-center gap-3 mb-5">
      <button @click="$emit('back')"
        class="text-gray-400 hover:text-gray-600 text-sm flex items-center gap-1">
        ← Volver
      </button>
      <h3 class="text-sm font-semibold text-gray-700 capitalize">{{ category }}</h3>
    </div>

    <!-- Sin prendas -->
    <div v-if="!items.length" class="text-center py-10">
      <p class="text-sm text-gray-300">No tienes prendas en esta categoría</p>
      <RouterLink to="/dashboard/armario"
        class="text-xs text-purple-400 hover:underline mt-2 inline-block">
        Ir al armario
      </RouterLink>
    </div>

    <!-- Grid -->
    <div v-else class="grid grid-cols-3 gap-3">
      <div
        v-for="item in items"
        :key="item._id"
        @click="$emit('select', item)"
        class="border border-gray-200 rounded-xl p-3 cursor-pointer hover:border-purple-400 transition-all"
      >
        <div class="w-full h-16 rounded-lg mb-2 flex items-center justify-center"
          :style="{ background: item.mainColor + '33' }">
          <img v-if="item.imageUrl" :src="item.imageUrl" class="h-full object-contain rounded-lg"/>
          <span v-else class="text-gray-300 text-lg">?</span>
        </div>
        <p class="text-xs font-medium text-gray-700 truncate">{{ item.name }}</p>
        <p class="text-xs text-gray-400">{{ item.material }}</p>
      </div>
    </div>
  </div>
</template>