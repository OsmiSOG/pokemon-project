import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

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
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  // Requires auth & no user
  if (requiresAuth && !(await store.dispatch('user/getCurrentUser'))) {
    next({ name: 'auth' })
    // No requires auth and user (auth)
  } else if (!requiresAuth && (await store.dispatch('user/getCurrentUser'))) {
    next({ name: 'Home' })
  } else {
    // Anything else
    next()
  }
})

export default router
