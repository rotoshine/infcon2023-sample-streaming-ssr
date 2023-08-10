import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { viteStaticCopy } from "vite-plugin-static-copy";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  root: "./src",
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: resolve(__dirname, "./public"),
          dest: "./assets",
        },
      ],
    }),
  ],
});
