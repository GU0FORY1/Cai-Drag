import { defineConfig, BuildOptions } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), //把src改为@
    },
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/proxyComponent/Button/Button.vue"),
      name: "MyLib",
      formats: ["umd"],
      fileName: `button`,
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      // external: ["vue"],
      // output: {
      //   // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
      //   globals: {
      //     vue: "Vue",
      //   },
      // },
    },
  },
});
