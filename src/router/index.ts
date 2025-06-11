import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/auth/Login.vue";
import Dashboard from "../views/dashboard/Dashboard.vue";

const routes = [
  {
    path: "/",
    redirect: "/login", // Redirige raíz a login
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true }, // 👈 Ruta protegida
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 🛡️ Middleware para proteger rutas
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  if (to.meta.requiresAuth && !token) {
    next("/login"); // Si no hay token, redirige a login
  } else {
    next(); // Todo OK
  }
});

export default router;
