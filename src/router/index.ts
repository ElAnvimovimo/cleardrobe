import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import Landing from '@/pages/Landing.vue'
import Login from '@/pages/Login.vue'
import Dashboard from '@/pages/Dashboard.vue'
import Estadisticas from '@/pages/dashboard/Estadisticas.vue'
import Armario from '@/pages/dashboard/Armario.vue'
import Atuendos from '@/pages/dashboard/Atuendos.vue'
import Calendario from '@/pages/dashboard/Calendario.vue'
import MasUsadas from '@/pages/dashboard/MasUsadas.vue'
import MenosUsadas from '@/pages/dashboard/MenosUsadas.vue'
import Register from '@/pages/Register.vue'

const routes: Array<RouteRecordRaw> = [
  { path: '/',      name: 'Landing', component: Landing },
  { path: '/login', name: 'Login',   component: Login   },
  { path: '/register', name: 'Register', component: Register },
  {
    path: '/dashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
    children: [
      { path: '',              name: 'Estadísticas',  component: Estadisticas  },
      { path: 'armario',       name: 'Mi armario',    component: Armario       },
      { path: 'atuendos',      name: 'Atuendos',      component: Atuendos      },
      { path: 'calendario',    name: 'Calendario',    component: Calendario    },
      { path: 'mas-usadas',    name: 'Más usadas',    component: MasUsadas     },
      { path: 'menos-usadas',  name: 'Menos usadas',  component: MenosUsadas   },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, _, next) => {
  const auth = useAuthStore()
  if ((to.path === '/login' || to.path === '/register') && auth.isAuthenticated) {
    next('/dashboard')
    return
  }
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    next('/login')
    return
  }
  next()
})

export default router