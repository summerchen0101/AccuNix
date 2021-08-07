import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    redirect: { name: "Line" },
  },
  {
    path: "/line",
    name: "Line",
    component: () => import("@/views/Line.vue"),
  },
  {
    path: "/facebook",
    name: "Facebook",
    component: () => import("@/views/Facebook.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
