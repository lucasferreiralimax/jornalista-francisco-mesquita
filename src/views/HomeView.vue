<script setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>

<template>
  <div class="home">
    <div>
      <div class="logo-content">
        <img
          class="logo"
          :alt="`${ t('name') } - Brasil`"
          src="@/assets/brasil.jpg"
          width="100"
          height="100"
        >
        <h1 class="title">
          {{ t('name') }}
        </h1>
      </div>
      <iframe
        :title="t('mapTitle')"
        class="maps"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3659.2077964662526!2d-46.49478318440793!3d-23.489023764811503!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce605cd2a82749%3A0x8a9a4d1bdd5e9018!2sEE%20Jornalista%20Francisco%20Mesquita!5e0!3m2!1spt-BR!2sbr!4v1612687376085!5m2!1spt-BR!2sbr"
        width="100%"
        height="500"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        allowfullscreen
      />
    </div>
    <div class="box">
      <h2>{{ t('welcome') }}</h2>
      <p>{{ t('info') }}</p>
      <iframe
        :title="t('facebookTitle')"
        class="facebook"
        src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FJornalistaFranciscoMesquita%2F&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
        width="340"
        height="500"
        loading="lazy"
        allowfullscreen
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.logo-content {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 0 !important;
  padding-left: 0 !important;
}
.title {
  font-size: 1.2rem;
  margin-left: 0rem;
  background: #fff;
  padding: 1rem 1rem 1rem 2rem;
  border-radius: 10px;
  display: flex;
  transform: translateX(-15px);
  z-index: 1;
  min-width: 300px;
  @media (max-width: 624px) {
    font-size: .8rem;
    min-width: 200px;
  }

}
.logo {
  animation: 3s logo_animation infinite alternate;
  border-radius: 250px;
  transition: .5s all;
  z-index: 2;
  cursor: crosshair;
  &:hover { transform: scale(1.05); }
  &:active { transform: scale(.9); }
  width: 100px;
}

p { white-space: pre-line; }

.box {
  display: flex;
  flex-direction: column;
  align-items: center;
  h2, p {
    display: inline-flex;
    background-color: #fff;
    flex-wrap: wrap;
    padding: 1rem;
    border-radius: 10px;
  }
}

.home {
  display: flex;
  z-index: 1;
  & div {
    flex: 1;
    padding: 0 2rem 2rem;
    text-align: left;
  }
  @media only screen and (max-width: 820px) {
    flex-direction: column;
     & div {
      padding: 0 2rem 2rem;
    }
  }
}

.facebook { overflow: hidden; }

.facebook, .maps {
  border: 0;
  border-radius: 10px;
  display: flex;
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
