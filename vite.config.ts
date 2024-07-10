/// <reference types="vitest" />
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import banner2 from 'rollup-plugin-banner2'
import packageJson from './package.json'

export default defineConfig({
  server: {
    watch: {},
  },
  build: {
    target: 'es2021', // web-node:v3 uses node v16.x
    minify: false,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs'],
      name: packageJson.name,
      fileName: 'main',
    },
    rollupOptions: {
      external: ['puppeteer', 'phantombuster'],
    },
  },
  plugins: [
    banner2(
      () => `${[
        `"phantom image: ${packageJson.phantomBuster?.image}"`,
        packageJson.phantomBuster?.flags ? `"phantom flags: ${packageJson.phantomBuster?.flags}"` : null,
        packageJson.phantomBuster?.dependencies ? `"phantom dependencies: ${packageJson.phantomBuster?.dependencies}"` : null,
      ].filter((directive) => !!directive).join('\n')}\n"EMPTY LINE"\n`,
    ),
  ],
  test: {},
})
