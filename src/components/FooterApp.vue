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
  background: var(--glass-bar);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border-top: 1px solid var(--glass-border);
  box-shadow: 0 -4px 24px rgba(4, 38, 56, .15);
  font-size: .9375rem;
  color: var(--text-strong);

  // Without blur support the transparent bar would hurt legibility
  @supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
    background: var(--surface-glass);
  }
}

.footer__inner {
  padding-block: 1.25rem;
  text-align: center;

  p { margin: 0; }
}

a { font-weight: 600; }
</style>
