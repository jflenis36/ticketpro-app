import { defineStore } from "pinia";

export const useLoadingStore = defineStore("loading", {
  state: () => ({
    isLoading: false,
    message: "Cargando...",
  }),
  actions: {
    show(message = "Cargando...") {
      this.isLoading = true;
      this.message = message;
    },
    hide() {
      this.isLoading = false;
      this.message = "Cargando...";
    },
  },
});
