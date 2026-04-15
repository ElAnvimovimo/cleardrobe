import { defineStore } from 'pinia'
import axios from 'axios'
import { useAuthStore } from './auth'

const API = 'http://localhost:3000/api'

export const useCalendarStore = defineStore('calendar', {
  state: () => ({
    // { "YYYY-MM-DD": { _id, date, outfitId: { ...outfitData } } }
    entries: {} as Record<string, any>,
    loading: false,
  }),
  actions: {
    async fetchMonth(month: string) {
      // month = "YYYY-MM"
      const auth = useAuthStore()
      this.loading = true
      try {
        const { data } = await axios.get(`${API}/calendar`, {
          params: { month },
          headers: { Authorization: `Bearer ${auth.token}` }
        })
        // Indexar por fecha para acceso O(1) en el template
        const map: Record<string, any> = {}
        for (const entry of data) map[entry.date] = entry
        this.entries = map
      } finally {
        this.loading = false
      }
    },

    async assign(date: string, outfitId: string, outfitData: any) {
      const auth = useAuthStore()
      // Optimistic update
      this.entries[date] = { date, outfitId: outfitData }
      try {
        const { data } = await axios.put(`${API}/calendar/${date}`, { outfitId }, {
          headers: { Authorization: `Bearer ${auth.token}` }
        })
        this.entries[date] = data
      } catch {
        // Revertir si falla
        delete this.entries[date]
      }
    },

    async remove(date: string) {
      const auth = useAuthStore()
      const backup = this.entries[date]
      // Optimistic update
      delete this.entries[date]
      try {
        await axios.delete(`${API}/calendar/${date}`, {
          headers: { Authorization: `Bearer ${auth.token}` }
        })
      } catch {
        // Revertir si falla
        this.entries[date] = backup
      }
    },
  }
})