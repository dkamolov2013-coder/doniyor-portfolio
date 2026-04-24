import Layout from "@/components/Layout";
import { ThemeProvider } from "@/context/ThemeContext";
import CodingJourneyPage from "@/pages/CodingJourneyPage";
import ContactPage from "@/pages/ContactPage";
import EducationPage from "@/pages/EducationPage";
import ExperiencePage from "@/pages/ExperiencePage";
import HomePage from "@/pages/HomePage";
import ProjectsPage from "@/pages/ProjectsPage";
import ServicesPage from "@/pages/ServicesPage";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

const rootRoute = createRootRoute({
  component: () => (
    <ThemeProvider>
      <Layout>
        <Outlet />
      </Layout>
    </ThemeProvider>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const servicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/services",
  component: ServicesPage,
});

const experienceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/experience",
  component: ExperiencePage,
});

const projectsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/projects",
  component: ProjectsPage,
});

const educationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/education",
  component: EducationPage,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: ContactPage,
});

const codingJourneyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/coding-journey",
  component: CodingJourneyPage,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  servicesRoute,
  experienceRoute,
  projectsRoute,
  educationRoute,
  contactRoute,
  codingJourneyRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
