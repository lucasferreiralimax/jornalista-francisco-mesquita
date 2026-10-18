<script setup>
import { useI18n } from 'vue-i18n';
import TranslateSelect from '@/components/TranslateSelect.vue';

const { t } = useI18n();
</script>

<template>
  <header class="header">
    <div class="header__inner container">
      <div class="brand">
        <img
          class="brand__logo"
          :alt="`${t('name')} - Brasil`"
          src="@/assets/brasil.jpg"
          width="64"
          height="64"
        >
        <h1 class="brand__name">
          {{ t('name') }}
        </h1>
      </div>
      <TranslateSelect />
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  position: sticky;
  top: 0;
  z-index: 10;
  background: rgba(255, 255, 255, .55);
  backdrop-filter: blur(16px) saturate(160%);
  -webkit-backdrop-filter: blur(16px) saturate(160%);
  border-bottom: 1px solid rgba(255, 255, 255, .6);
  box-shadow: 0 4px 24px rgba(4, 38, 56, .15);

  // Without blur support the transparent bar would hurt legibility
  @supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
    background: var(--surface-glass);
  }
}

.header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding-block: .75rem;

  @media (max-width: 480px) {
    gap: .75rem;
    padding-block: .5rem;
  }
}

.brand {
  display: flex;
  align-items: center;
  gap: .875rem;
  min-width: 0;
}

.brand__logo {
  flex-shrink: 0;
  width: clamp(40px, 9vw, 64px);
  height: auto;
  border-radius: 50%;
  animation: 4s logo-glow infinite alternate;
  transition: transform .3s ease;

  &:hover { transform: scale(1.05); }
}

.brand__name {
  margin: 0;
  font-size: clamp(.875rem, 2.6vw, 1.375rem);
  line-height: 1.2;
  color: var(--text-strong);
}

@keyframes logo-glow {
  0% { box-shadow: 0 0 0 2px #fff, 0 0 24px var(--brand-yellow); }
  50% { box-shadow: 0 0 0 2px #fff, 0 0 20px var(--brand-blue); }
  100% { box-shadow: 0 0 0 2px #fff, 0 0 16px var(--brand-green); }
}

@media (prefers-reduced-motion: reduce) {
  .brand__logo { animation: none; }
}
</style>
