import { createRouter, createWebHistory } from 'vue-router';
import { SUPPORT_LOCALES, setI18nLanguage, loadLocaleMessages } from '../i18n';
import HomeView from '../views/HomeView.vue';

export default function setupRouter(i18n) {
  const locale = i18n.mode === 'legacy' ? i18n.global.locale : i18n.global.locale.value;

  const routes = [
    {
      path: '/:locale/',
      name: 'Home',
      component: HomeView,
    },
    {
      path: '/:locale/about',
      name: 'About',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: () => `/${locale}`,
    },
  ];

  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
  });

  router.beforeEach(async (to, from, next) => {
    const paramsLocale = to.params.locale;

    // use locale if paramsLocale is not in SUPPORT_LOCALES
    if (!SUPPORT_LOCALES.includes(paramsLocale)) {
      return next(`/${locale}`);
    }

    // load locale messages
    if (!i18n.global.availableLocales.includes(paramsLocale)) {
      await loadLocaleMessages(i18n, paramsLocale);
    }

    // set i18n language
    setI18nLanguage(i18n, paramsLocale);

    return next();
  });

  return router;
}

