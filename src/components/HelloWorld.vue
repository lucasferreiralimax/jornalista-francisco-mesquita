<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>{{ $t('message.message-1') }}</p>
    <i18n-t keypath="message.message-2" tag="p" for="message.repo">
      <a href="https://github.com/lucasferreiralimax/jornalista-francisco-mesquita" target="_blank">{{ $t('message.repo') }}</a>
    </i18n-t>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
};
</script>

<style scoped lang="scss">
.hello {
  padding: 10px;
}
a { color: #42b983; }
</style>
