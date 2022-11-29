import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/pets'
  },
  {
    path: '/pets',
    name: 'pets',
    component: () => import(/* webpackChunkName: "pets" */ '@/views/pets.vue'),
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/pet/:name',
    name: 'pet',
    component: () => import(/* webpackChunkName: "pet" */ '@/views/pet.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () =>
      import(/* webpackChunkName: "not-found" */ '@/views/not-found.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
