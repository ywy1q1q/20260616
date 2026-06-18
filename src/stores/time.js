import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTimeStore = defineStore('time', () => {
  const TIME = import.meta.env.VITE_TIME
  const TIME_BREAK = import.meta.env.VITE_TIME_BREAK

  // 目前事項剩餘時間
  const timeleft = ref(TIME)
  // 是否是休息時間
  const isBreakTime = ref(false)

  return {
    TIME,
    TIME_BREAK,
    timeleft,
    isBreakTime,
  }
},
{
  persist: {
    key: 'pomodoro-time',
    pick: ['timeleft', 'isBreakTime'],
  },
},
)
