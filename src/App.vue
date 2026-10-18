<script setup>
import { RouterView } from 'vue-router'
import HeaderApp from '@/components/HeaderApp.vue'
import FooterApp from '@/components/FooterApp.vue'
</script>

<template>
  <HeaderApp />
  <main class="container main">
    <RouterView />
  </main>
  <FooterApp />
</template>

<style lang="scss">
:root {
  --brand-blue: #07476b;
  --brand-blue-dark: #053551;
  --brand-green: #00a63f;
  --brand-yellow: #f5c400;
  --text: #2c3e50;
  --text-strong: #13293d;
  --text-muted: #3a4b5c;
  --surface: #fff;
  --surface-glass: rgba(255, 255, 255, .9);
  --glass-bar: rgba(255, 255, 255, .62);
  --glass-card: rgba(255, 255, 255, .76);
  --glass-inset: rgba(255, 255, 255, .6);
  --glass-border: rgba(255, 255, 255, .6);
  --glass-blur: blur(16px) saturate(160%);
  --radius: 16px;
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, .12);
  --shadow: 0 10px 30px rgba(6, 40, 61, .25);
  --gutter: clamp(1rem, 4vw, 2rem);
}

// Respect OS settings for less transparency / more contrast
@media (prefers-reduced-transparency: reduce), (prefers-contrast: more) {
  :root {
    --glass-bar: #fff;
    --glass-card: #fff;
    --glass-inset: #eef3f7;
    --glass-blur: none;
    --text-muted: #2c3e50;
  }
}

*, *::before, *::after { box-sizing: border-box; }

html { -webkit-text-size-adjust: 100%; }

body {
  margin: 0;
  min-height: 100vh;
  font-family: Avenir, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  color: var(--text);
  background: #0b4a63;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  // Fixed layer instead of background-attachment: fixed, which iOS ignores
  &::before {
    content: '';
    position: fixed;
    inset: 0;
    z-index: -1;
    background:
      linear-gradient(180deg, rgba(4, 38, 56, .55), rgba(4, 38, 56, .15) 40%, rgba(4, 38, 56, .45)),
      url('./assets/classroom.jpg') center / cover no-repeat;
  }
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin-inline: auto;
  padding-inline: var(--gutter);
}

.main {
  flex: 1;
  padding-block: clamp(1.5rem, 4vw, 3rem);
}

a {
  color: var(--brand-blue);
  text-underline-offset: .15em;

  &:hover { color: var(--brand-blue-dark); }
}

:focus-visible {
  outline: 3px solid var(--brand-yellow);
  outline-offset: 2px;
}
</style>
