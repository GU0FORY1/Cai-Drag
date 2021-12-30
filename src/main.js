import { createApp } from "vue";
import App from "./App.vue";
import Button from "@/proxyComponent/Button";
import Bar from "@/proxyComponent/Bar";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import { createPinia } from "pinia";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(ElementPlus);
app.component("c-button", Button);
app.component("c-bar", Bar);
app.mount("#app");
