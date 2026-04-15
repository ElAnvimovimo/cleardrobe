<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth   = useAuthStore()

const form = ref({
  name:            '',
  email:           '',
  password:        '',
  confirmPassword: '',
})

const error   = ref('')
const loading = ref(false)

const submit = async () => {
  error.value = ''

  if (!form.value.name || !form.value.email || !form.value.password) {
    error.value = 'Todos los campos son requeridos'
    return
  }
  if (form.value.password !== form.value.confirmPassword) {
    error.value = 'Las contraseñas no coinciden'
    return
  }
  if (form.value.password.length < 6) {
    error.value = 'La contraseña debe tener al menos 6 caracteres'
    return
  }

  try {
    loading.value = true
    const { data } = await axios.post('http://localhost:3000/api/auth/register', {
      name:     form.value.name,
      email:    form.value.email,
      password: form.value.password,
    })
    auth.token = data.token
    auth.user  = data.user
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))
    router.push('/dashboard')
  } catch (e: any) {
    error.value = e?.response?.data?.message || 'Error al crear la cuenta'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <div class="w-full max-w-md">

      <!-- Logo -->
      <div class="text-center mb-8">
        <RouterLink to="/" class="inline-flex items-center gap-2">
          <img src="/assets/carita.png" class="h-8" alt="logo"/>
          <span class="text-lg font-semibold text-gray-900">Cleardrobe</span>
        </RouterLink>
      </div>

      <div class="bg-white rounded-2xl p-8 border border-gray-100">
        <h2 class="text-xl font-bold text-gray-900 mb-1">Crear cuenta</h2>
        <p class="text-xs text-gray-400 mb-6">Empieza a organizar tu guardarropa hoy.</p>

        <p v-if="error" class="text-xs text-red-400 mb-4 bg-red-50 px-3 py-2 rounded-lg">{{ error }}</p>

        <div class="space-y-4">

          <div>
            <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Nombre
            </label>
            <input
              v-model="form.name"
              type="text"
              placeholder="Tu nombre"
              class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-purple-400 placeholder-gray-300"
            />
          </div>

          <div>
            <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Email
            </label>
            <input
              v-model="form.email"
              type="email"
              placeholder="tu@email.com"
              class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-purple-400 placeholder-gray-300"
            />
          </div>

          <div>
            <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Contraseña
            </label>
            <input
              v-model="form.password"
              type="password"
              placeholder="••••••••"
              class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-purple-400 placeholder-gray-300"
            />
          </div>

          <div>
            <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Confirmar contraseña
            </label>
            <input
              v-model="form.confirmPassword"
              type="password"
              placeholder="••••••••"
              class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-purple-400 placeholder-gray-300"
            />
          </div>

        </div>

        <button
          @click="submit"
          :disabled="loading"
          class="w-full mt-6 bg-gray-900 hover:bg-gray-700 disabled:opacity-50 text-white text-sm font-medium py-3 rounded-xl transition-colors"
        >
          {{ loading ? 'Creando cuenta...' : 'Crear cuenta' }}
        </button>

        <p class="text-xs text-center text-gray-400 mt-4">
          ¿Ya tienes cuenta?
          <RouterLink to="/login" class="text-purple-500 hover:underline">Iniciar sesión</RouterLink>
        </p>
      </div>

    </div>
  </div>
</template>