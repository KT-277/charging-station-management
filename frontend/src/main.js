import { createApp } from 'vue';
   import App from './App.vue';
   import router from './router';
   import Toast from 'vue-toastification';
   import 'vue-toastification/dist/index.css';
   import './assets/main.css';
   import './assets/leaflet-fix.css';

   const app = createApp(App);
   app.use(router);
   app.use(Toast);
   app.mount('#app');