import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import path from "path";

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
    port: 8888,
    proxy: {
      "/api": {
        target: "https://cms2.accunix.net",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  // define: {
  //   "process.env": {
  //     VITE_API_BASE_URL: process.env.VITE_API_BASE_URL,
  //   },
  // },
});
