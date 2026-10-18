<script setup>
import { watch, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { SUPPORT_LOCALES } from '../i18n';

const router = useRouter();
const { t, locale } = useI18n({ useScope: 'global' });
const currentLocale = ref(locale.value);
const supportLocales = SUPPORT_LOCALES;

// Show each language in its own name, e.g. "Português (Brasil)"
function languageName(code) {
  try {
    const name = new Intl.DisplayNames([code], { type: 'language' }).of(code);
    return name.charAt(0).toLocaleUpperCase(code) + name.slice(1);
  } catch {
    return code;
  }
}

watch(router.currentRoute, (route) => {
  if (route.params.locale) currentLocale.value = route.params.locale;
});

watch(currentLocale, (val) => {
  if (val === router.currentRoute.value.params.locale) return;
  router.push({
    name: router.currentRoute.value.name,
    params: { locale: val },
  });
});
</script>

<template>
  <label class="translate">
    <span class="visually-hidden">{{ t('language') }}</span>
    <select
      v-model="currentLocale"
      class="translate-options"
    >
      <option
        v-for="optionLocale in supportLocales"
        :key="`locale-${optionLocale}`"
        :value="optionLocale"
        :lang="optionLocale"
      >
        {{ languageName(optionLocale) }}
      </option>
    </select>
  </label>
</template>

<style scoped lang="scss">
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
}
.translate-options {
  padding: 5px;
  margin-bottom: 5px;
  border-radius: 5px;
  cursor: pointer;
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 11;
  box-shadow: 0 0 0 5px #fff, 0 0 0 7px rgba(0, 0, 0, .2), 0 0 10px 7px rgba(0, 0, 0, .2);
}
</style>
