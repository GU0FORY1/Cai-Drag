import { defineStore } from "pinia";
import { ref } from "vue";

export const useGlobalStore = defineStore("global", {
  state: () => {
    return { width: 1920, height: 1080, scale: 1, currentSelect: null };
  },
  actions: {},
});
