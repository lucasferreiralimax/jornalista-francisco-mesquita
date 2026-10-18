<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t, tm, rt } = useI18n();

const levels = computed(() => tm('levels').map((level) => ({
  name: rt(level.name),
  grades: rt(level.grades),
})));

const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=EE+Jornalista+Francisco+Mesquita';
</script>

<template>
  <div class="home">
    <section class="card intro">
      <h2 class="intro__title">
        {{ t('welcome') }}
      </h2>
      <p class="intro__text">
        {{ t('tagline') }}
      </p>
    </section>

    <section
      class="card levels"
      aria-labelledby="levels-title"
    >
      <h2
        id="levels-title"
        class="card__title"
      >
        {{ t('levelsTitle') }}
      </h2>
      <ul class="levels__list">
        <li
          v-for="level in levels"
          :key="level.name"
          class="levels__item"
        >
          <strong>{{ level.name }}</strong>
          <span>{{ level.grades }}</span>
        </li>
      </ul>
    </section>

    <section
      class="card location"
      aria-labelledby="location-title"
    >
      <div class="card__header">
        <h2
          id="location-title"
          class="card__title"
        >
          {{ t('locationTitle') }}
        </h2>
        <a
          class="button"
          :href="mapsUrl"
          target="_blank"
          rel="noopener noreferrer"
        >{{ t('openMap') }}</a>
      </div>
      <iframe
        :title="t('mapTitle')"
        class="embed embed--map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3659.2077964662526!2d-46.49478318440793!3d-23.489023764811503!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce605cd2a82749%3A0x8a9a4d1bdd5e9018!2sEE%20Jornalista%20Francisco%20Mesquita!5e0!3m2!1spt-BR!2sbr!4v1612687376085!5m2!1spt-BR!2sbr"
        width="100%"
        height="450"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        allowfullscreen
      />
    </section>

    <section
      class="card social"
      aria-labelledby="social-title"
    >
      <h2
        id="social-title"
        class="card__title"
      >
        {{ t('socialTitle') }}
      </h2>
      <iframe
        :title="t('facebookTitle')"
        class="embed embed--facebook"
        src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FJornalistaFranciscoMesquita%2F&tabs=timeline&width=500&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
        width="500"
        height="500"
        loading="lazy"
        allowfullscreen
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
      />
    </section>
  </div>
</template>

<style scoped lang="scss">
.home {
  display: grid;
  gap: clamp(1rem, 2.5vw, 1.5rem);
  grid-template-columns: minmax(0, 1fr);
  grid-template-areas:
    "intro"
    "levels"
    "location"
    "social";

  @media (min-width: 900px) {
    grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
    grid-template-areas:
      "intro    intro"
      "levels   location"
      "social   location";
    align-items: start;
  }
}

.card {
  background: var(--glass-card);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: clamp(1.25rem, 3vw, 2rem);

  // Without blur support the transparent card would hurt legibility
  @supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
    background: var(--surface-glass);
  }
}

.card__header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: .75rem;
  margin-bottom: 1rem;

  .card__title { margin-bottom: 0; }
}

.card__title {
  margin: 0 0 1rem;
  font-size: clamp(1.125rem, 2.2vw, 1.375rem);
  color: var(--text-strong);
}

.intro {
  grid-area: intro;
  border-top: 6px solid var(--brand-green);
}

.intro__title {
  margin: 0 0 .25rem;
  font-size: clamp(1.75rem, 4.5vw, 2.5rem);
  line-height: 1.15;
  color: var(--brand-blue);
}

.intro__text {
  margin: 0;
  font-size: clamp(1rem, 2vw, 1.125rem);
  color: var(--text-muted);
}

.levels { grid-area: levels; }

.levels__list {
  display: grid;
  gap: .75rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.levels__item {
  display: grid;
  gap: .125rem;
  padding: .75rem 1rem;
  border-left: 4px solid var(--brand-yellow);
  border-radius: 0 10px 10px 0;
  background: var(--glass-inset);

  &:nth-child(2) { border-left-color: var(--brand-green); }
  &:nth-child(3) { border-left-color: var(--brand-blue); }

  strong { color: var(--text-strong); }
  span { color: var(--text-muted); }
}

.location {
  grid-area: location;

  @media (min-width: 900px) {
    position: sticky;
    top: 7rem;
  }
}

.social {
  grid-area: social;
  text-align: center;
}

.embed {
  display: block;
  width: 100%;
  border: 0;
  border-radius: 12px;
  background: #eef2f5;
}

.embed--map {
  height: clamp(300px, 55vh, 520px);
}

.embed--facebook {
  max-width: 500px;
  background: transparent;
  margin-inline: auto;
  overflow: hidden;
}

.button {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding: .5rem 1rem;
  border-radius: 999px;
  background: var(--brand-blue);
  color: #fff;
  font-weight: 600;
  font-size: .9375rem;
  text-decoration: none;
  transition: background-color .2s ease;

  &:hover { background: var(--brand-blue-dark); }
}
</style>
