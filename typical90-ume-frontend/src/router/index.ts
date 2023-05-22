import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home-view.vue'
import RootView from '../views/root-view.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'root',
      component: RootView
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    }
  ]
})

export default router
