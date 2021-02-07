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
  border-radius: 5px;
  cursor: pointer;
}
</style>
