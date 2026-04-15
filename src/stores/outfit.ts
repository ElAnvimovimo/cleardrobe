import { defineStore } from 'pinia'
import axios from 'axios'
import { useAuthStore } from './auth'

const API = 'http://localhost:3000/api'

export const useOutfitStore = defineStore('outfit', {
    state: () => ({
        items: [] as any[],
        loading: false,
    }),
    actions: {
        async fetchAll() {
        const auth = useAuthStore()
        this.loading = true
        const { data } = await axios.get(`${API}/outfits`, {
            headers: { Authorization: `Bearer ${auth.token}` }
        })
        this.items = data
        this.loading = false
        },
        async create(payload: any) {
        const auth = useAuthStore()
        console.log('Enviando:', payload)
        console.log('Token:', auth.token)
        const { data } = await axios.post(`${API}/outfits`, payload, {
            headers: { Authorization: `Bearer ${auth.token}` }
        })
        this.items.push(data)
        },
        async remove(id: string) {
        const auth = useAuthStore()
        await axios.delete(`${API}/outfits/${id}`, {
            headers: { Authorization: `Bearer ${auth.token}` }
        })
        this.items = this.items.filter(i => i._id !== id)
        }
    }
})