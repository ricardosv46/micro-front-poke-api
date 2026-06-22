import { createModuleFederationConfig } from "@module-federation/vite";

export default createModuleFederationConfig({
  name: "mfDetail",
  filename: "remoteEntry.js",
  exposes: {
    "./Detail": "./src/modules/detail/presentation/pages/Detail.tsx",
  },
  shared: ["react", "react-dom"],
});
