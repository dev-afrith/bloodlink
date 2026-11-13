// BloodLink Vite configuration with TanStack Start, Nitro SSR, and Tailwind CSS.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    // Discover animation and form dependencies before serving React. Late optimizer
    // passes can leave an already-open preview using different React module URLs.
    optimizeDeps: {
      include: ["framer-motion", "react-hook-form", "@hookform/resolvers/zod", "zod"],
    },
  },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});
