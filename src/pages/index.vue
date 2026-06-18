<template>
  <v-container>
    <v-row>
      <v-col class="text-center d-flex justify-center" cols="12">
        <digit-number
          v-for="(text, idx) in timeleftText"
          :key="idx"
          color="white"
          :data="text"
        />
      </v-col>

      <v-col class="text-center" cols="12">
        <h1>{{ list.currentItem || '沒有事項' }}</h1>
      </v-col>

      <v-col class="text-center d-flex ga-5 justify-center" cols="12">
        <!--
          開始按鈕停用條件
          1. 倒數中
          2. 沒有目前事項也沒有未完成事項
        -->
        <v-btn
          :disabled="status === STATUS.COUNTING || (list.currentItem.length === 0 && list.items.length === 0)"
          icon="mdi-play"
          @click="startTimer"
        />
        <!-- 只有倒數中才能暫停 -->
        <v-btn
          :disabled="status !== STATUS.COUNTING"
          icon="mdi-pause"
          @click="pauseTimer"
        />
        <!-- 目前有事項才能跳過 -->
        <v-btn
          :disabled="list.currentItem.length === 0"
          icon="mdi-skip-next"
          @click="finish"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import { useWebNotification } from '@vueuse/core'
  import { computed, ref } from 'vue'
  import DigitNumber from '@/components/DigitNumber.vue'
  import { useListStore } from '@/stores/list'
  import { useSettingsStore } from '@/stores/settings'
  import { useTimeStore } from '@/stores/time'

  const list = useListStore()
  const time = useTimeStore()
  const settings = useSettingsStore()

  const timeleftText = computed(() => {
    const m = Math.floor(time.timeleft / 60).toString().padStart(2, '0')
    const s = (time.timeleft % 60).toString().padStart(2, '0')
    return m + ':' + s
  })

  const STATUS = {
    STOP: 0,
    COUNTING: 1,
    PAUSE: 2,
  }
  const status = ref(STATUS.STOP)
  let timer = 0

  const startTimer = () => {
    // 如果是停止狀態開始倒數、目前沒有事項
    // 從待辦事項中取出第一個放入目前事項
    if (status.value === STATUS.STOP && list.currentItem === '') {
      list.currentItem = time.isBreakTime ? '休息一下' : list.items.shift().text
    }

    status.value = STATUS.COUNTING

    timer = setInterval(() => {
      time.timeleft--
      if (time.timeleft <= 0) {
        finish()
      }
    }, 1000)
  }

  const finish = () => {
    clearInterval(timer)

    status.value = STATUS.STOP

    const audio = new Audio()
    audio.src = settings.selectedAlarm.file
    audio.play()

    const { show, isSupported, permissionGranted } = useWebNotification({
      title: '事項完成',
      body: list.currentItem,
      icon: new URL('@/assets/food.png', import.meta.url).href,
    })
    if (isSupported.value && permissionGranted.value) {
      show()
    }

    if (!time.isBreakTime) {
      list.finishedItems.push({
        id: list.id++,
        text: list.currentItem,
      })
    }

    list.currentItem = ''

    if (list.items.length > 0) {
      time.isBreakTime = !time.isBreakTime
    }

    time.timeleft = time.isBreakTime ? time.TIME_BREAK : time.TIME

    if (list.items.length > 0) {
      startTimer()
    }
  }

  const pauseTimer = () => {
    clearInterval(timer)
    status.value = STATUS.PAUSE
  }
</script>

<route lang="yaml">
meta:
  title: 首頁
</route>
