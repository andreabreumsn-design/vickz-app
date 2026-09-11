import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config.js'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      setupFiles: ['./src/test/setup.js'],
      include: ['src/**/*.{test,spec}.{js,jsx}'],
      globals: true,
      css: false,
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json-summary', 'html', 'lcov'],
        reportsDirectory: './coverage',
        include: ['src/**/*.{js,jsx}'],
        exclude: [
          'src/main.jsx',
          'src/**/*.test.*',
          'src/test/**'
        ],
        thresholds: {
          '**/NavigationBar.jsx': {
            lines: 100,
            statements: 100,
            functions: 100,
            branches: 80
          },
          'src/{NavigationBar,Header,Banner,KPICards,QuickActions,SystemStatus,InformativeCard,EngineerCard}.jsx': {
            lines: 14,
            statements: 14
          }
        }
      }
    }
  })
)
