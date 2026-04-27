import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import zipPack from 'vite-plugin-zip-pack'
import path from 'path'

export default defineConfig({
  plugins: [react(),
  zipPack({
    inDir: 'freedom-or-not-freedom',
    outDir: 'freedom-or-not-freedom',
    outFileName: 'freedom-or-not-freedom.zip',
    enableLogging: true
  })
  ],
  build: {
    outDir: 'freedom-or-not-freedom',
  },
  server: {
    fs: {
      strict: false
    }
  }
})