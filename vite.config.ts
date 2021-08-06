import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  esbuild: {
    jsxInject: `import React from 'react'`,
    jsxFactory: "h",
    jsxFragment: "Fragment",
  },
  plugins: [vue(), vueJsx()],
  server: {
    watch: {
      usePolling: true,
    },
  },
});
