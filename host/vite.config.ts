import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { federation } from "@module-federation/vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const detailRemoteUrl = env.VITE_MF_DETAIL_URL ?? "http://localhost:3001/remoteEntry.js";
  const historyRemoteUrl = env.VITE_MF_HISTORY_URL ?? "http://localhost:3002/remoteEntry.js";

  return {
    plugins: [
      react(),
      tailwindcss(),
      federation({
        dts: true,
        dev: { disableDynamicRemoteTypeHints: true, remoteHmr: true },
        name: "host",
        remotes: {
          mfDetail: {
            type: "module",
            name: "mfDetail",
            entry: detailRemoteUrl,
            entryGlobalName: "mfDetail",
            shareScope: "default",
          },
          mfHistory: {
            type: "module",
            name: "mfHistory",
            entry: historyRemoteUrl,
            entryGlobalName: "mfHistory",
            shareScope: "default",
          },
        },
        shared: ["react", "react-dom"],
      }),
    ],
    server: { port: 3000 },
  };
});
