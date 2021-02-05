<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>Web site em desenvolvimento</p>
    <p>se deseja colaborar acesse o <a href="#">repositório público</a></p>
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
