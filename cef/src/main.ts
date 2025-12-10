import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import { useAuthStore } from './stores/auth';

const app = createApp(App);
app.use(createPinia());
app.mount('#app');

// Ejemplo: Evento desde client
mp.events.add('cef:login', (data: { username: string }) => {
  const store = useAuthStore();
  store.login(data.username);
});