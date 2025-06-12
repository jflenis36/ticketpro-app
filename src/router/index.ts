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
  {
    path: "/tickets/create",
    name: "CreateTicket",
    component: () => import("../views/tickets/CreateTicket.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/tickets/:id/edit",
    name: "EditTicket",
    component: () => import("../views/tickets/EditTicket.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/tickets",
    name: "TicketList",
    component: () => import("../views/tickets/TicketList.vue"),
    meta: { requiresAuth: true },
  },
  {
  path: '/tickets/:id',
  name: 'TicketDetails',
  component: () => import('../views/tickets/TicketDetails.vue'),
  meta: { requiresAuth: true }
}
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
