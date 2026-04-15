import { defineStore } from 'pinia'
import api from '@/lib/axios'
import { useAuthStore } from './auth'

export const useCalendarStore = defineStore('calendar', {
  state: () => ({
    entries: {} as Record<string, any>,
    loading: false,
  }),
  actions: {
    async fetchMonth(month: string) {
      const auth = useAuthStore()
      this.loading = true
      try {
        const { data } = await api.get('/api/calendar', {
          params: { month },
          headers: { Authorization: `Bearer ${auth.token}` },
        })
        const map: Record<string, any> = {}
        for (const entry of data) map[entry.date] = entry
        this.entries = map
      } finally {
        this.loading = false
      }
    },
    async assign(date: string, outfitId: string, outfitData: any) {
      const auth = useAuthStore()
      this.entries[date] = { date, outfitId: outfitData }
      try {
        const { data } = await api.put(
          `/api/calendar/${date}`,
          { outfitId },
          {
            headers: { Authorization: `Bearer ${auth.token}` },
          },
        )
        this.entries[date] = data
      } catch {
        delete this.entries[date]
      }
    },
    async remove(date: string) {
      const auth = useAuthStore()
      const backup = this.entries[date]
      delete this.entries[date]
      try {
        await api.delete(`/api/calendar/${date}`, {
          headers: { Authorization: `Bearer ${auth.token}` },
        })
      } catch {
        this.entries[date] = backup
      }
    },
  },
})
