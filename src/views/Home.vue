<template>
  <div class="home">
    <img class="logo" alt="E.E.Jornalista Francisco Mesquita - Brasil" src="../assets/brasil.jpg">
    <HelloWorld :msg="$t('message.hello')"/>
    <iframe class="facebook" src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FJornalistaFranciscoMesquita%2F&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId" width="340" height="500" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
    <iframe class="maps" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3659.2077964662526!2d-46.49478318440793!3d-23.489023764811503!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce605cd2a82749%3A0x8a9a4d1bdd5e9018!2sEE%20Jornalista%20Francisco%20Mesquita!5e0!3m2!1spt-BR!2sbr!4v1612687376085!5m2!1spt-BR!2sbr" width="340" height="340" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
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

.facebook, .maps {
  border-radius: 10px;
  display: flex;
  margin: 0 auto 50px;
  clear: both;
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
