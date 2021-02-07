<template>
  <div class="home">
    <img class="logo" alt="E.E.Jornalista Francisco Mesquita - Brasil" src="../assets/brasil.jpg">
    <HelloWorld :msg="$t('message.hello')"/>
    <iframe class="facebook" src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FJornalistaFranciscoMesquita%2F&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId" width="340" height="500" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
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

.facebook { border-radius: 10px; }

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
