import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useListStore = defineStore('list', () => {
  // 待辦事項
  const items = ref([])
  // 已完成事項
  const finishedItems = ref([])
  // 目前事項
  const currentItem = ref('')
  // 累加用的 id
  const id = ref(1)

  return {
    items,
    finishedItems,
    currentItem,
    id,
  }
}, {
  persist: {
    key: 'pomodoro-list',
  },
})
