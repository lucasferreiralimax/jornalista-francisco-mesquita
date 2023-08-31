<script setup>
import { RouterView } from 'vue-router'
import TranslateSelect from '@/components/TranslateSelect.vue'
import FooterApp from '@/components/FooterApp.vue'
</script>

<template>
  <TranslateSelect />
  <RouterView />
  <FooterApp />
</template>

<style lang="scss">
body {
  padding: 2rem 0 0;
  margin: 0;
  display: flex;
  justify-content: center;
  min-height: calc(100vh - 40px);
}

#app {
  width: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
