import { createRouter, createWebHistory } from 'vue-router'
import store from '../store/index'

const LandingPokemons = () => import('../views/LandingPokemons.vue')
const Pokemon = () => import('../views/Pokemon.vue')
const Login = () => import('../views/Login.vue')
const Register = () => import('../views/Register.vue')

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: LandingPokemons
  },
  {
    path: '/pokemon/:id',
    name: 'Pokemon',
    props: true,
    component: Pokemon,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    props: true,
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  }
]

const router = createRouter({
  mode: 'history',
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  // Requires auth & no user
  if ((to.name === 'Login' || to.name === 'Register') && (await store.dispatch('user/getCurrentUser'))) {
    return '/'
  }
  if (requiresAuth && !(await store.dispatch('user/getCurrentUser'))) {
    return {
      path: '/login',
      query: { redirect: to.fullPath }
    }
  }
})

export default router
