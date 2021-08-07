import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "@/views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/line",
    name: "Line",
    component: () => import("@/views/Line.vue"),
    children: [
      {
        path: "/line/charts",
        name: "LineCharts",
        component: () => import("@/views/LineCharts.vue"),
      },
      {
        path: "/line/settings",
        name: "LineSettings",
        component: () => import("@/views/LineSettings.vue"),
      },
    ],
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
