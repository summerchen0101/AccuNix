import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    redirect: { name: "Line" },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
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
  {
    path: "/keywords/list",
    name: "KeywordList",
    component: () => import("@/views/keywords/List.vue"),
  },
  {
    path: "/keywords/Create",
    name: "KeywordCreate",
    component: () => import("@/views/keywords/Create.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
