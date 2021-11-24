import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    redirect: { name: 'LineSetting' },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/line',
    name: 'Line',
    component: () => import('@/views/line/Index.vue'),
    redirect: { name: 'LineChart' },
    children: [
      {
        path: '/line/chart',
        name: 'LineChart',
        component: () => import('@/views/line/Charts.vue'),
      },
      {
        path: '/line/robot',
        name: 'LineRobot',
        component: () => import('@/views/line/Robot.vue'),
      },
    ],
  },
  {
    path: '/facebook',
    name: 'Facebook',
    component: () => import('@/views/fb/Index.vue'),
    redirect: { name: 'FbChart' },
    children: [
      {
        path: '/facebook/chart',
        name: 'FbChart',
        component: () => import('@/views/fb/Charts.vue'),
      },
      {
        path: '/facebook/robot',
        name: 'FbRobot',
        component: () => import('@/views/fb/Robot.vue'),
      },
    ],
  },
  {
    path: '/keywords/list',
    name: 'KeywordList',
    component: () => import('@/views/keywords/List.vue'),
  },
  {
    path: '/keywords/Create',
    name: 'KeywordCreate',
    component: () => import('@/views/keywords/Create.vue'),
  },
  {
    path: '/inbox/list',
    name: 'InboxList',
    component: () => import('@/views/inbox/List.vue'),
  },
  {
    path: '/inbox/Create',
    name: 'InboxCreate',
    component: () => import('@/views/inbox/Create.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
