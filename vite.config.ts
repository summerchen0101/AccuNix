import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import path from "path";
import fs from "fs";

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
    https: {
      key: fs.readFileSync(`${__dirname}/src/assets/localhost.key`),
      cert: fs.readFileSync(`${__dirname}/src/assets/localhost.crt`),
    },
  },
  // define: {
  //   "process.env": {
  //     VITE_API_BASE_URL: process.env.VITE_API_BASE_URL,
  //   },
  // },
});
