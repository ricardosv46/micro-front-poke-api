import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import moduleFederationConfig from "./module-federation.config";
import { federation } from "@module-federation/vite";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), federation(moduleFederationConfig), tailwindcss()],
  server: {
    port: 3001,
    cors: true,
  },
  preview: {
    port: 3001,
    cors: true,
  },
});
