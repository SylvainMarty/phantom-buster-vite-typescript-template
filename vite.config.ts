/// <reference types="vitest" />
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import packageJson from './package.json'

export default defineConfig({
  server: {
    watch: {},
  },
  build: {
    target: 'es2021', // web-node:v3 uses node v16.x
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      name: packageJson.name,
      fileName: 'main',
    },
  },
  test: {},
})
