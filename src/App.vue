<template>
  <v-app>
    <v-app-bar color="deep-orange-darken-2">
      <v-container class="d-flex align-center">
        <v-app-bar-title>番茄鐘</v-app-bar-title>
        <v-btn prepend-icon="mdi-home" to="/">首頁</v-btn>
        <v-btn prepend-icon="mdi-format-list-bulleted" to="/list">事項</v-btn>
        <v-btn prepend-icon="mdi-cog" to="/settings">設定</v-btn>
      </v-container>
    </v-app-bar>

    <v-main>
      <!-- Component 代表目前應該顯示的頁面元件 -->
      <router-view v-slot="{ Component }">
        <!--
          keep-alive 被包住的內容不會被銷毀
          include 指定保留的元件名稱
        -->
        <!-- component 動態元件，用 is 定義顯示什麼元件 -->
        <keep-alive include="index">
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </v-main>

    <v-footer app class="text-center justify-center" height="44">
      <a href="https://www.flaticon.com/free-icons/pomodoro" title="pomodoro icons">Pomodoro icons created by Atif Arshad - Flaticon</a>
    </v-footer>
  </v-app>
</template>

<script setup>
</script>
