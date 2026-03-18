<script setup lang="ts">
import { useRouter } from 'vue-router'
import Header from '../components/Header.vue'

const router = useRouter()

const goToLogin = (): void => {
  router.push('/login')
}
</script>

<template>
  <div class="min-h-screen bg-purple-100">
    <Header>
      <button @click="goToLogin" class="text-gray-600 hover:text-blue-600">Login</button>
      <button class="bg-blue-600 text-white px-4 py-2 rounded-lg">Sign Up</button>
    </Header>

    <main class="text-center mt-20">
      <RouterView />
    </main>
  </div>
</template>
