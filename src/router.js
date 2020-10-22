import { createRouter, createWebHistory } from "vue-router";
import VasarlasBase from "./components/vasarlas/VasarlasBase.vue";
import Tetel from "./components/tetel/Tetel.vue";

const routes = [
  {
    path: "/",
    name: "vasarlas",
    component: VasarlasBase,
  },
  {
    path: "/tetel/:id",
    name: "tetel",
    component: Tetel,
  },
  { path: "/:notFound(.*)", redirect: "/" }, // catch undefined paths
  { path: "/teams/:notFound(.*)", redirect: "/" }, // catch undefined paths
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
