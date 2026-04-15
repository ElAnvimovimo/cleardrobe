import { defineStore } from 'pinia'
import api from '@/lib/axios'
import { useAuthStore } from './auth'

export const useOutfitStore = defineStore('outfit', {
  state: () => ({
    items: [] as any[],
    loading: false,
  }),
  actions: {
    async fetchAll() {
      const auth = useAuthStore()
      this.loading = true
      const { data } = await api.get('/api/outfits', {
        headers: { Authorization: `Bearer ${auth.token}` },
      })
      this.items = data
      this.loading = false
    },
    async create(payload: any) {
      const auth = useAuthStore()
      const { data } = await api.post('/api/outfits', payload, {
        headers: { Authorization: `Bearer ${auth.token}` },
      })
      this.items.push(data)
    },
    async remove(id: string) {
      const auth = useAuthStore()
      await api.delete(`/api/outfits/${id}`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      })
      this.items = this.items.filter((i) => i._id !== id)
    },
  },
})
