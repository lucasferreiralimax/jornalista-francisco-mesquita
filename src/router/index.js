import { createRouter, createWebHistory } from 'vue-router';
import {
  SUPPORT_LOCALES, setI18nLanguage, loadLocaleMessages, getCurrentLocale, saveLocale,
} from '../i18n';
import HomeView from '../views/HomeView.vue';

export default function setupRouter(i18n) {
  const routes = [
    {
      path: '/:locale/',
      name: 'Home',
      component: HomeView,
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: () => `/${getCurrentLocale(i18n)}`,
    },
  ];

  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
  });

  router.beforeEach(async (to) => {
    const paramsLocale = to.params.locale;

    if (!SUPPORT_LOCALES.includes(paramsLocale)) {
      return `/${getCurrentLocale(i18n)}`;
    }

    if (!i18n.global.availableLocales.includes(paramsLocale)) {
      await loadLocaleMessages(i18n, paramsLocale);
    }

    setI18nLanguage(i18n, paramsLocale);
    saveLocale(paramsLocale);

    return true;
  });

  return router;
}
