import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import store from './store';
import setupRouter from './router';
import { setupI18n } from './i18n';
import pt from './locales/pt-BR.json';

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

createApp(App)
  .use(i18n)
  .use(store)
  .use(router)
  .mount('#app');
