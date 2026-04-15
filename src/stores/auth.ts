import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') as string | null,
    user:  JSON.parse(localStorage.getItem('user') || 'null') as { id: string, name: string, email: string } | null,
  }),
  getters: {
    isAuthenticated: (state): boolean => !!state.token,
  },
  actions: {
    async login(email: string, password: string) {
      const { data } = await axios.post('http://localhost:3000/api/auth/login', { email, password })
      this.token = data.token
      this.user  = data.user
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
    },
    logout() {
      this.token = null
      this.user  = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  }
})