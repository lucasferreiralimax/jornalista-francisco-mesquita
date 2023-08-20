import { createApp } from 'vue'

import App from './App.vue'
import setupRouter from './router';
import { setupI18n } from './i18n';
import pt from './locales/pt-BR.json';

const app = createApp(App)
const i18n = setupI18n({
  globalInjection: true,
  legacy: false,
  locale: 'pt-BR',
  fallbackLocale: 'pt-BR',
  messages: {
    pt,
  },
});
const router = setupRouter(i18n);

app.use(router)
app.use(i18n)
app.mount('#app')
