import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/molit": {
        target: "https://openapi.molit.go.kr:8081",
        changeOrigin: true,
        secure: false,
        rewrite: (path) =>
          path.replace(
            "/molit",
            "/OpenAPI_ToolInstallPackage/service/rest"
          ),
      },
    },
  },
});
