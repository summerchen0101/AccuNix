import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    redirect: { name: 'LineDashboard' },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/layout',
    component: () => import('@/views/Layout.vue'),
    children: [
      {
        path: '/line/dashboard',
        name: 'LineDashboard',
        component: () => import('@/views/Dashboard.vue'),
      },
      {
        path: '/line/richmenu',
        name: 'LineRichmenu',
        component: () => import('@/views/richmenu/List.vue'),
      },
      {
        path: '/line/richmenu/create',
        name: 'LineRichmenuCreate',
        component: () => import('@/views/richmenu/Create.vue'),
      },
    ],
  },
  {
    path: '/layout',
    component: () => import('@/views/Layout.vue'),
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
