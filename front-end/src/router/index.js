import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import store from '../store/index';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/grades',
    name: 'grades',
    component: () => import(/* webpackChunkName: "about" */ '../views/Grades.vue'),
    meta: {requireAuth: true}
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const protectedRoute = to.matched.some(record => record.meta.requireAuth);
  if(protectedRoute && store.state.token === ''){
    next({ name: 'login' })
  }else{
    next();
  }
})

export default router;