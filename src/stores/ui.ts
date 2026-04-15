import { defineStore } from 'pinia'

export const useUIStore = defineStore('ui', {
  state: () => ({
    showClothingModal: false,
  }),
  actions: {
    openClothingModal()  { this.showClothingModal = true  },
    closeClothingModal() { this.showClothingModal = false },
    openOutfitModal()  { this.showClothingModal = true  },
    closeOutfitModal() { this.showClothingModal = false },
  }
})