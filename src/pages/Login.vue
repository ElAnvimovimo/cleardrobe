<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const emailValue    = ref('')
const passwordValue = ref('')
const error         = ref('')
const router        = useRouter()
const auth          = useAuthStore()

const submit = async () => {
  try {
    await auth.login(emailValue.value, passwordValue.value)
    router.push('/dashboard')
  } catch (e: any) {
    console.log('Error completo:', e)
    console.log('Response:', e?.response?.data)
    error.value = e?.response?.data?.message || 'Error desconocido'
  }
}
</script>

<template>
  <div class="min-h-screen bg-purple-100">
    <main class="text-center">
      <section class="bg-gray-50 dark:bg-gray-900">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <RouterLink
            to="/"
            class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img class="w-8 h-8 mr-2" src="/assets/carita.png" alt="logo" />
            ClearDrobe
          </RouterLink>
          <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>

              <p v-if="error" class="text-sm text-red-500">{{ error }}</p>

              <div class="space-y-4 md:space-y-6">
                <div>
                  <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your email
                  </label>
                  <input
                    v-model="emailValue"
                    type="email"
                    id="email"
                    class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div>
                  <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Password
                  </label>
                  <input
                    v-model="passwordValue"
                    type="password"
                    id="password"
                    placeholder="••••••••"
                    class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>
                <button
                  type="button"
                  @click="submit"
                  class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Login
                </button>
                <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                Don't have an account yet?
                <RouterLink to="/register" class="font-medium text-purple-600 hover:underline">
                  Sign up
                </RouterLink>
              </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>