import { createWebHistory, createRouter } from "vue-router";

import TaskDetailComponent from "../components/TaskDetailComponent.vue"
import TaskListComponent from "../components/TaskListComponent.vue"

const routes = [
  { path: '/', name: "Tasks", component: TaskListComponent},
  { path: '/details/:taskId', name: "Details", component: TaskDetailComponent},
  { path: "/:catchAll(.*)", redirect: '/'},
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;