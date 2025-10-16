// import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes: [
//     {path: '/', name: 'home', component: HomeView,},
//     {path: '/about', name: 'about', component: () => import('../views/AboutView.vue'),},
//   ],
// })

// export default router


import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/LoginPage.vue'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ProfileView from '@/views/ProfileView.vue'

const routes = [
  { path: '/', component: LoginPage }, 
  { path: '/home', component: HomeView }, 
  { path: '/about', component: AboutView },
  { path: '/profil', component: ProfileView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

