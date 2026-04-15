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
    <Header> </Header>

    <main class="text-center mt-20">
      <RouterView />
    </main>
  </div>
</template>
