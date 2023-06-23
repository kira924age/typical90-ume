import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/home-view.vue'
import AboutView from '@/views/about-view.vue'
import AdsView from '@/views/ads-view.vue'
import UserView from '@/views/user-view.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/user',
      name: 'user',
      component: UserView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/ads',
      name: 'ads',
      component: AdsView
    }
  ]
})

export default router
