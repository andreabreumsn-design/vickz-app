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
        // perFile: true + piso global falharia os 40 JSX a 0%.
        // Só arquivos listados abaixo travam o CI.
        thresholds: {
          'src/NavigationBar.jsx': {
            lines: 100,
            statements: 100,
            functions: 100,
            branches: 80
          }
        }
      }
    }
  })
)
