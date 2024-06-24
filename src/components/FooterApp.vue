<script setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>

<template>
  <footer class="footer">
    <i18n-t keypath="footer" tag="p" for="repo">
      <a href="https://github.com/lucasferreiralimax/jornalista-francisco-mesquita" target="_blank">{{ t('repo') }}</a>
    </i18n-t>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  background: #fff;
  display: inline-flex;
  padding: 1rem;
  border-radius: 10px;
  margin-bottom: 2rem;
  p {
    margin: 0;
    padding: 0;
  }
}
a { color: #000; }
</style>
