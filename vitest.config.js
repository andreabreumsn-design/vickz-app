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
        reporter: ['text', 'json-summary', 'html'],
        reportsDirectory: './coverage',
        include: ['src/**/*.{js,jsx}'],
        exclude: [
          'src/main.jsx',
          'src/**/*.test.*',
          'src/test/**'
        ],
        // Glob = pasta lógica (src/ é plano). Sem perFile:true —
        // o % é a SOMA dos arquivos do glob. Grupos a 0% não entram.
        thresholds: {
          '**/NavigationBar.jsx': {
            lines: 100,
            statements: 100,
            functions: 100,
            branches: 80
          },
          // chrome: Nav 28 + Header/Banner/KPIs/etc. a 0 = ~15%
          'src/{NavigationBar,Header,Banner,KPICards,QuickActions,SystemStatus,InformativeCard,EngineerCard}.jsx': {
            lines: 14,
            statements: 14
          }
        }
      }
    }
  })
)
