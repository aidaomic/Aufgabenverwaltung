import { createWebHistory, createRouter } from "vue-router";

import TaskDetailComponent from "../components/TaskDetailComponent.vue"
import TaskEditComponent from "../components/TaskFormComponent.vue"
import TaskListComponent from "../components/TaskListComponent.vue"

const routes = [
  { path: '/', name: "Tasks", component: TaskListComponent},
  { path: '/details/:taskId', name: "Details", component: TaskDetailComponent},
  { path: '/form/:taskId', name: "EditForm", component: TaskEditComponent},
  { path: '/form/', name: "AddForm", component: TaskEditComponent},
  { path: "/:catchAll(.*)", redirect: '/'},
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;