<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t, tm, rt } = useI18n();

// Official data (INEP School Census / Seduc-SP), same in every language
const school = {
  inep: '35036766',
  patron: 'Francisco Mesquita (1893–\u20601969)',
  address: 'Rua Wenceslau Guimarães, 581 – Parque Císper, São Paulo – SP, 03823-000',
  phones: ['(11) 2943-0800', '(11) 2546-7448'],
  email: 'e036766a@educacao.sp.gov.br',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=EE+Jornalista+Francisco+Mesquita',
};

const levels = computed(() => tm('levels').map((level) => ({
  name: rt(level.name),
  grades: rt(level.grades),
})));

const timeline = computed(() => tm('history.timeline').map((item) => ({
  year: rt(item.year),
  text: rt(item.text),
})));

const facilities = computed(() => tm('structure.items').map((item) => rt(item)));

const facts = computed(() => [
  { label: t('about.network'), value: t('about.networkValue') },
  { label: t('about.shifts'), value: t('about.shiftsValue') },
  { label: t('about.inep'), value: school.inep },
  { label: t('about.patron'), value: school.patron },
]);

const telHref = (phone) => `tel:+55${phone.replace(/\D/g, '')}`;
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
      class="card about"
      aria-labelledby="about-title"
    >
      <h2
        id="about-title"
        class="card__title"
      >
        {{ t('about.title') }}
      </h2>
      <p class="text">
        {{ t('about.text') }}
      </p>
      <dl class="facts">
        <div
          v-for="fact in facts"
          :key="fact.label"
          class="facts__item"
        >
          <dt>{{ fact.label }}</dt>
          <dd>{{ fact.value }}</dd>
        </div>
      </dl>
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
      <p class="source">
        {{ t('source') }}
      </p>
    </section>

    <section
      class="card location"
      aria-labelledby="location-title"
    >
      <h2
        id="location-title"
        class="card__title"
      >
        {{ t('locationTitle') }}
      </h2>
      <div class="location__body">
        <div class="contact">
          <dl class="contact__list">
            <div>
              <dt>{{ t('contact.address') }}</dt>
              <dd>
                <address>{{ school.address }}</address>
              </dd>
            </div>
            <div>
              <dt>{{ t('contact.phone') }}</dt>
              <dd
                v-for="phone in school.phones"
                :key="phone"
              >
                <a :href="telHref(phone)">{{ phone }}</a>
              </dd>
            </div>
            <div>
              <dt>{{ t('contact.email') }}</dt>
              <dd>
                <a
                  class="contact__email"
                  :href="`mailto:${school.email}`"
                >{{ school.email }}</a>
              </dd>
            </div>
          </dl>
          <a
            class="button"
            :href="school.mapsUrl"
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
      </div>
    </section>

    <section
      class="card history"
      aria-labelledby="history-title"
    >
      <h2
        id="history-title"
        class="card__title"
      >
        {{ t('history.title') }}
      </h2>
      <p class="text history__intro">
        {{ t('history.intro') }}
      </p>
      <ol class="timeline">
        <li
          v-for="item in timeline"
          :key="item.year"
          class="timeline__item"
        >
          <span class="timeline__year">{{ item.year }}</span>
          <p class="timeline__text">
            {{ item.text }}
          </p>
        </li>
      </ol>
    </section>

    <section
      class="card structure"
      aria-labelledby="structure-title"
    >
      <h2
        id="structure-title"
        class="card__title"
      >
        {{ t('structure.title') }}
      </h2>
      <ul class="facilities">
        <li
          v-for="item in facilities"
          :key="item"
          class="facilities__item"
        >
          <svg
            class="facilities__icon"
            viewBox="0 0 20 20"
            width="20"
            height="20"
            aria-hidden="true"
          >
            <circle
              cx="10"
              cy="10"
              r="10"
            />
            <path d="M5.5 10.5l3 3 6-6.5" />
          </svg>
          {{ item }}
        </li>
      </ul>
      <p class="source">
        {{ t('source') }}
      </p>
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
    "about"
    "levels"
    "location"
    "history"
    "structure"
    "social";

  @media (min-width: 900px) {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    grid-template-areas:
      "intro     intro"
      "about     levels"
      "location  location"
      "history   history"
      "structure social";
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

.card__title {
  margin: 0 0 1rem;
  font-size: clamp(1.125rem, 2.2vw, 1.375rem);
  color: var(--text-strong);
}

.text {
  margin: 0 0 1.25rem;
  color: var(--text);
}

.source {
  margin: 1rem 0 0;
  font-size: .875rem;
  color: var(--text-muted);
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

// About
.about { grid-area: about; }

.facts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: .75rem;
  margin: 0;
}

.facts__item {
  padding: .75rem 1rem;
  border-radius: 10px;
  background: var(--glass-inset);

  dt {
    font-size: .8125rem;
    font-weight: 600;
    letter-spacing: .02em;
    text-transform: uppercase;
    color: var(--text-muted);
  }

  dd {
    margin: .125rem 0 0;
    font-weight: 600;
    color: var(--text-strong);
  }
}

// Levels
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

  &:nth-child(3n + 2) { border-left-color: var(--brand-green); }
  &:nth-child(3n) { border-left-color: var(--brand-blue); }

  strong { color: var(--text-strong); }
  span { color: var(--text-muted); }
}

// Location + contact
.location { grid-area: location; }

.location__body {
  display: grid;
  gap: 1.25rem;

  @media (min-width: 700px) {
    grid-template-columns: minmax(0, 2fr) minmax(0, 3fr);
    align-items: start;
  }
}

.contact {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.25rem;
}

.contact__list {
  display: grid;
  gap: 1rem;
  margin: 0;

  dt {
    font-size: .8125rem;
    font-weight: 600;
    letter-spacing: .02em;
    text-transform: uppercase;
    color: var(--text-muted);
  }

  dd {
    margin: .125rem 0 0;
    color: var(--text-strong);
  }

  address { font-style: normal; }

  a {
    display: inline-block;
    padding-block: .25rem;
    font-weight: 600;
  }
}

.contact__email { overflow-wrap: anywhere; }

// History
.history { grid-area: history; }

.history__intro { max-width: 70ch; }

.timeline {
  display: grid;
  gap: 1rem;
  margin: 0;
  padding: 0;
  list-style: none;

  @media (min-width: 600px) {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  }
}

.timeline__item {
  position: relative;
  padding: 1rem 1rem 1rem 1.25rem;
  border-left: 4px solid var(--brand-blue);
  border-radius: 0 10px 10px 0;
  background: var(--glass-inset);

  &:last-child { border-left-color: var(--brand-green); }
}

.timeline__year {
  display: block;
  font-size: 1.375rem;
  font-weight: 700;
  line-height: 1.2;
  color: var(--brand-blue);
}

.timeline__text {
  margin: .25rem 0 0;
  color: var(--text);
}

// Facilities
.structure { grid-area: structure; }

.facilities {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: .625rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.facilities__item {
  display: flex;
  align-items: flex-start;
  gap: .625rem;
  padding: .625rem .75rem;
  border-radius: 10px;
  background: var(--glass-inset);
  color: var(--text-strong);
}

.facilities__icon {
  flex-shrink: 0;
  margin-top: .125rem;

  circle { fill: var(--brand-green); }
  path {
    fill: none;
    stroke: #fff;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
}

// Social
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
  height: clamp(300px, 50vh, 420px);
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

  &:hover {
    background: var(--brand-blue-dark);
    color: #fff;
  }
}
</style>
