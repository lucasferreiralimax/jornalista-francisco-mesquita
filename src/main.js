import { createApp } from 'vue'

import App from './App.vue'
import setupRouter from './router';
import { setupI18n, getInitialLocale, DEFAULT_LOCALE } from './i18n';
import ptBR from './locales/pt-BR.json';

const app = createApp(App)
const i18n = setupI18n({
  globalInjection: true,
  legacy: false,
  locale: getInitialLocale(),
  fallbackLocale: DEFAULT_LOCALE,
  messages: {
    [DEFAULT_LOCALE]: ptBR,
  },
});
const router = setupRouter(i18n);

app.use(router)
app.use(i18n)
app.mount('#app')
