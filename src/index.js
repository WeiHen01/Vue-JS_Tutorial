import { createRouter, createWebHistory } from 'vue-router'
import Home from './components/Home.vue'
import AuthRoutes from './components/Authentication/Auth.js' 
import UserRoutes from './components/User/User.js'

const baseRoutes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
]

const routes = [
  ...baseRoutes,
  ...AuthRoutes,
  ...UserRoutes
]
  
const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;
  