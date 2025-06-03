import { createRouter, createWebHistory } from 'vue-router';
   import Login from '../views/Login.vue';
   import ChargerList from '../views/ChargerList.vue';
   import MapView from '../views/MapView.vue';

   const routes = [
     { path: '/', redirect: '/login' },
     { path: '/login', component: Login },
     { path: '/chargers', component: ChargerList, meta: { requiresAuth: true } },
     { path: '/map', component: MapView, meta: { requiresAuth: true } },
   ];

   const router = createRouter({
     history: createWebHistory(),
     routes,
   });

   router.beforeEach((to, from, next) => {
     const token = localStorage.getItem('token');
     if (to.meta.requiresAuth && !token) {
       next('/login');
     } else {
       next();
     }
   });

   export default router;