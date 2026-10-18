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
.translate {
  flex-shrink: 0;
}
.translate-options {
  min-height: 44px;
  max-width: 44vw;
  padding: .5rem 2rem .5rem .875rem;
  border: 1px solid #c9d4dd;
  border-radius: 999px;
  background: #fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='none' stroke='%2313293d' stroke-width='2' d='M1 1l5 5 5-5'/%3E%3C/svg%3E") no-repeat right .875rem center;
  color: var(--text-strong);
  font: inherit;
  font-size: .9375rem;
  text-overflow: ellipsis;
  cursor: pointer;
  appearance: none;
  transition: border-color .2s ease, box-shadow .2s ease;

  &:hover { border-color: var(--brand-blue); }

  @media (max-width: 480px) {
    padding: .375rem 1.75rem .375rem .75rem;
    background-position: right .625rem center;
    font-size: .875rem;
  }
}
</style>
