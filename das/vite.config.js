import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        "/api": {
          target: env.VITE_API_BASE_URL || "https://docbook-57yh.onrender.com",
          changeOrigin: true,
          secure: false,
          // keep the /api prefix
          rewrite: (path) => path.replace(/^\/api/, "/api"),
        },
      },
    },
  };
});
