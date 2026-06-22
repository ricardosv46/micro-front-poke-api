import { createModuleFederationConfig } from "@module-federation/vite";

export default createModuleFederationConfig({
  name: "mfHistory",
  filename: "remoteEntry.js",
  exposes: {
    "./History": "./src/modules/history/presentation/pages/History.tsx",
  },
  shared: ["react", "react-dom"],
});
