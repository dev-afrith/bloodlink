import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it("matches dedicated route for /request-blood", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/request-blood");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
    expect(matches.at(-1)?.routeId).toContain("/request-blood");
  });

  it("matches dedicated routes for /requests and /become-a-donor", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    expect(router.matchRoutes("/requests").at(-1)?.routeId).not.toBe(rootRouteId);
    expect(router.matchRoutes("/become-a-donor").at(-1)?.routeId).not.toBe(rootRouteId);
  });
});
