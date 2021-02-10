<template>
  <footer class="footer">
    <i18n-t keypath="footer" tag="p" for="repo">
      <a href="https://github.com/lucasferreiralimax/jornalista-francisco-mesquita" target="_blank">{{ $t('repo') }}</a>
    </i18n-t>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
};
</script>

<style scoped lang="scss">
a { color: #000; }
</style>
