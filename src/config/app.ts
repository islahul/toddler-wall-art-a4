import { PROJECT_CONSTANTS } from '../../constants.ts'

// App-wide configuration
export const APP_CONFIG = {
  // Production base path for GitHub Pages deployment
  PRODUCTION_BASE_PATH: PROJECT_CONSTANTS.PRODUCTION_BASE_PATH,
  
  // App metadata
  APP_NAME: PROJECT_CONSTANTS.APP_NAME,
  APP_DESCRIPTION: PROJECT_CONSTANTS.APP_DESCRIPTION,
  
  // GitHub Pages URL
  GITHUB_PAGES_URL: PROJECT_CONSTANTS.GITHUB_PAGES_URL,
} as const

// Helper function to get the base path based on environment
export const getBasePath = (): string => {
  return import.meta.env.PROD ? APP_CONFIG.PRODUCTION_BASE_PATH : ''
}

// Helper function to get the full base path with trailing slash for router
export const getRouterBasePath = (): string => {
  return import.meta.env.PROD ? `${APP_CONFIG.PRODUCTION_BASE_PATH}/` : '/'
} 