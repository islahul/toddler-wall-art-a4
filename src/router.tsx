import { createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router'
import { Home } from './pages/Home'
import { ProjectView } from './pages/ProjectView'
import { SheetView } from './pages/SheetView'

const rootRoute = createRootRoute({
  component: () => (
    <div>
      <Outlet />
    </div>
  ),
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
})

const projectRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/project/$projectId',
  component: ProjectView,
})

const sheetRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/sheet/$sheetNumber',
  component: SheetView,
})

const routeTree = rootRoute.addChildren([indexRoute, projectRoute, sheetRoute])

export const router = createRouter({ 
  routeTree,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
} 