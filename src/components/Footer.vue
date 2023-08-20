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
a { color: #000; }
</style>
