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
    component: () => import('@/views/Login/index.vue'),
  },
  {
    path: '/layout',
    component: () => import('@/views/Layout/index.vue'),
    children: [
      {
        path: '/line/dashboard',
        name: 'LineDashboard',
        component: () => import('@/views/Dashboard/index.vue'),
      },
      {
        path: '/line/richmenu',
        name: 'LineRichmenu',
        component: () => import('@/views/Line/Richmenu/List/index.vue'),
      },
      {
        path: '/line/richmenu/create',
        name: 'LineRichmenuCreate',
        component: () => import('@/views/Line/Richmenu/Create/index.vue'),
      },
      {
        path: '/line/message',
        name: 'LineMessage',
        component: () => import('@/views/Line/Message/List/index.vue'),
      },
      {
        path: '/line/message/create',
        name: 'LineMessageCreate',
        component: () => import('@/views/Line/Message/Create/index.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
