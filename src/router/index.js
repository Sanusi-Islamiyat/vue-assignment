// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import Layout from "../Layout.vue";
import TodoDetailsModal from "../TodoDetailsModal.vue";
import NotFoundPage from "../NotFoundPage.vue";
import ErrorPage from "../ErrorPage.vue";

export const routes = [
  { path: "/", component: Layout },
  {
    path: "/todo/:id",
    component: TodoDetailsModal,
    props: route => ({ id: route.params.id }) // We'll handle data elsewhere
  },
  { path: "/not-found", component: NotFoundPage },
  { path: "/error", component: ErrorPage },
  { path: "/:catchAll(.*)", component: NotFoundPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
