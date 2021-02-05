<template>
  <div class="home">
    <img class="logo" alt="E.E.Jornalista Francisco Mesquita - Brasil" src="../assets/brasil.jpg">
    <HelloWorld msg="Seja bem-vindo"/>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'Home',
  components: { HelloWorld },
};
</script>

<style lang="scss">
.logo {
  animation: 3s logo_animation infinite alternate;
  border-radius: 250px;
  width: calc(100% - 30px);
  transition: .5s all;
  cursor: crosshair;
  &:hover { transform: scale(1.05); }
  &:active { transform: scale(.9); }
  @media only screen and (min-width: 560px) {
    width: auto;
  }
}

@keyframes logo_animation {
  0% {
    box-shadow: 0 0 0 2px #fff, 0 0 80px #ff0;
  }
  50% {
    box-shadow: 0 0 0 2px #fff, 0 0 60px rgb(0, 110, 255);
  }
  100% {
    box-shadow: 0 0 0 2px #fff, 0 0 50px rgb(0, 165, 63);
  }
}
</style>
