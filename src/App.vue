<template>
  <TranslateSelect/>
  <router-view/>
</template>

<script>
import TranslateSelect from '@/components/TranslateSelect.vue';

export default {
  name: 'App',
  components: { TranslateSelect },
};
</script>

<style lang="scss">
body {
  animation: 6s background_animation infinite alternate;
  padding: 20px 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 40px);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

@keyframes background_animation {
  0% {
    box-shadow: inset 0 10px 250px #ff0;
  }
  50% {
    box-shadow: inset 0 10px 250px rgb(0, 110, 255);
  }
  100% {
    box-shadow: inset 0 10px 250px rgb(0, 165, 63);
  }
}
</style>
