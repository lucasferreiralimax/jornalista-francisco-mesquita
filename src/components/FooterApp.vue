<script setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>

<template>
  <footer class="footer">
    <div class="container footer__inner">
      <i18n-t
        keypath="footer"
        tag="p"
      >
        <a
          href="https://github.com/lucasferreiralimax/jornalista-francisco-mesquita"
          target="_blank"
          rel="noopener noreferrer"
        >{{ t('repo') }}</a>
      </i18n-t>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  background: var(--surface-glass);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  font-size: .9375rem;
  color: var(--text-muted);
}

.footer__inner {
  padding-block: 1.25rem;
  text-align: center;

  p { margin: 0; }
}

a {
  color: var(--brand-blue);
  font-weight: 600;
}
</style>
