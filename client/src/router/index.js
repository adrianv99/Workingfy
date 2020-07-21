import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/landing_views/Inicio.vue'
import ConsigueFreelancer from '../views/landing_views/ConsigueFreelancer.vue'
import ConsigueTrabajo from '../views/landing_views/ConsigueTrabajo.vue'
import Login from '../views/landing_views/Login.vue'
import Registrate from '../views/landing_views/Registrate.vue'
import Explorar from '../views/users_views/Explorar.vue'
import Panel from '../views/users_views/Panel.vue'


Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/consigueFreelancer',
    name: 'ConsigueFreelancer',
    component: ConsigueFreelancer
  },
  {
    path: '/consigueTrabajo',
    name: 'ConsigueTrabajo',
    component: ConsigueTrabajo
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/registrate',
    name: 'Registrate',
    component: Registrate
  },
  {
    path: '/explorar',
    name: 'Explorar',
    component: Explorar
  },
  {
    path: '/panel',
    name: 'Panel',
    component: Panel
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
