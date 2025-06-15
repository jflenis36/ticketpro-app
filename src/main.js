import { createApp } from "vue";
import App from "./App.vue";

import router from "./router";
import { createPinia } from "pinia";

import Toast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

import "./style.css";

const app = createApp(App);

app.use(router);
app.use(createPinia());
app.use(Toast, {
  position: "top-right",
  duration: 3000,
  dismissible: true,
});

app.mount("#app");

// createApp(App).use(router).use(createPinia()).mount('#app')
