import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useSettingsStore = defineStore('settings', () => {
  // 所有鈴聲的資料

  const alarms = [
    { id: 1, name: '鬧鐘', file: new URL('@/assets/alarm.mp3', import.meta.url).href },
    { id: 2, name: 'Yay', file: new URL('@/assets/yay.mp3', import.meta.url).href },
  ]
  // 使用者選擇的鈴聲id
  const selectedAlarmId = ref(1)
  // 選擇的鈴聲
  const selectedAlarm = computed(() => {
    const idx = alarms.findIndex(alarm => alarm.id === selectedAlarmId.value)
    return alarms[idx]
  })

  return {
    alarms,
    selectedAlarmId,
    selectedAlarm,
  }
}, {
  persist: {
    key: 'pomodoro-settings',
    pick: ['selectedAlarmId'],
  },
})
