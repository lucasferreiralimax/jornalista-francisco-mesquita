<template>
  <select class="translate-options" v-model="currentLocale">
    <option
      v-for="optionLocale in supportLocales"
      :key="`locale-${optionLocale}`"
      :value="optionLocale">{{ optionLocale }}
    </option>
  </select>
</template>

<script>
import { defineComponent, watch, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { SUPPORT_LOCALES } from '../i18n';

export default defineComponent({
  name: 'TranslateSelect',
  setup() {
    const router = useRouter();
    const { t, locale } = useI18n({ useScope: 'global' });
    const currentLocale = ref(locale.value);
    watch(router.currentRoute, (route) => {
      currentLocale.value = route.params.locale;
    });
    watch(currentLocale, (val) => {
      router.push({
        name: router.currentRoute.value.name,
        params: { locale: val },
      });
    });
    return {
      t, locale, currentLocale, supportLocales: SUPPORT_LOCALES,
    };
  },
});
</script>

<style lang="scss">
.translate-options {
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 5px;
  cursor: pointer;
  position: fixed;
  top: 2rem;
  right: 2rem;
  box-shadow: 0 0 0 5px #fff, 0 0 0 7px rgba(0, 0, 0, .2), 0 0 10px 7px rgba(0, 0, 0, .2);
}
</style>
