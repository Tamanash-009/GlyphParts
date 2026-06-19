import { defineConfig } from '@vite-pwa/assets-generator/config'

export default defineConfig({
  preset: {
    transparent: {
      sizes: [72, 96, 128, 144, 152, 192, 384, 512],
      favicons: false
    },
    maskable: {
      sizes: [512],
      padding: 0
    },
    apple: {
      sizes: [180]
    }
  },
  images: ['public/favicon.svg']
})
