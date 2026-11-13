import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  ScrollRestoration,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, useRef, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportError } from "../lib/error-reporting";
import { Navbar, Footer, BackToHome } from "@/components/bloodlink/shared";
import { MotionConfig } from "framer-motion";
import { ToastProvider } from "@/components/ui/toast-notification";
import { BloodRequestProvider } from "@/context/blood-request-context";
import { AuthProvider } from "@/context/auth-context";

/**
 * RouteChangeScrollManager
 * Ensures whenever a user navigates to a new page or route, the viewport
 * immediately resets to top (0, 0), guaranteeing the page heading and primary content
 * appear instantly rather than jumping to the footer or preserving previous scroll offsets.
 * Preserves intentional hash anchors on the homepage.
 */
function RouteChangeScrollManager() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const hash = useRouterState({ select: (s) => s.location.hash });
  const prevPathRef = useRef<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // If an intentional hash is present (e.g. /#find-donors), allow the section target handler to run
    if (hash && hash.length > 1) {
      prevPathRef.current = pathname;
      return;
    }

    // When pathname changes or on initial route load, instantly scroll to top
    if (prevPathRef.current !== pathname) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      prevPathRef.current = pathname;

      // Secondary micro-task safeguard in case any child components mount asynchronously
      const timer = setTimeout(() => {
        if (!window.location.hash) {
          window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        }
      }, 0);

      return () => clearTimeout(timer);
    }
  }, [pathname, hash]);

  return null;
}

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "BloodLink – Every Drop Connects a Life" },
      {
        name: "description",
        content:
          "BloodLink is a premier healthcare technology platform connecting voluntary blood donors, blood banks, and urgent patient requests in real-time.",
      },
      { name: "author", content: "BloodLink" },
      { property: "og:title", content: "BloodLink – Every Drop Connects a Life" },
      {
        property: "og:description",
        content:
          "Connecting voluntary blood donors, hospitals, and communities in real-time. Fast, secure, and community-driven.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "BloodLink" },
      { property: "og:image", content: "/og-image.svg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "BloodLink – Every Drop Connects a Life" },
      {
        name: "twitter:description",
        content:
          "Connecting voluntary blood donors, hospitals, and communities in real-time. Fast, secure, and community-driven.",
      },
      { name: "twitter:image", content: "/og-image.svg" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <AuthProvider>
          <BloodRequestProvider>
            {/* Scroll management on route change */}
            <ScrollRestoration />
            <RouteChangeScrollManager />

            {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
            <MotionConfig reducedMotion="user">
              <Navbar />
              <main>
                <BackToHome />
                <Outlet />
              </main>
              <Footer />
            </MotionConfig>
          </BloodRequestProvider>
        </AuthProvider>
      </ToastProvider>
    </QueryClientProvider>
  );
}
