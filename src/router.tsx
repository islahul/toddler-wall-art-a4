import { createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router'
import { Home } from './pages/Home'
import { ProjectView } from './pages/ProjectView'
import { NumberProjectView } from './pages/NumberProjectView'
import { SheetView } from './pages/SheetView'
import { NumberSheetView } from './pages/NumberSheetView'
import { getRouterBasePath } from './config/app'

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

const numberProjectRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/number-project/$projectId',
  component: NumberProjectView,
})

const sheetRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/sheet/$sheetNumber',
  component: SheetView,
})

const numberSheetRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/number-sheet/$sheetNumber',
  component: NumberSheetView,
})

const routeTree = rootRoute.addChildren([indexRoute, projectRoute, numberProjectRoute, sheetRoute, numberSheetRoute])

export const router = createRouter({ 
  routeTree,
  basepath: getRouterBasePath(),
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
} 