import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Plugin to automatically generate blog-index.json from folders in public/post
function blogIndexPlugin() {
  const generateIndex = () => {
    const postsDir = path.resolve(__dirname, 'public/post')
    if (!fs.existsSync(postsDir)) {
      fs.mkdirSync(postsDir, { recursive: true })
    }

    const folders = fs.readdirSync(postsDir).filter(file => {
      return fs.statSync(path.join(postsDir, file)).isDirectory()
    })

    fs.writeFileSync(
      path.resolve(__dirname, 'public/blog-index.json'),
      JSON.stringify(folders, null, 2)
    )
    console.log('✓ Blog index updated auto-magically')
  }

  return {
    name: 'blog-index-generator',
    buildStart() {
      generateIndex()
    },
    configureServer(server: any) {
      server.watcher.on('addDir', (dirPath: string) => {
        if (dirPath.includes('public/post')) generateIndex()
      })
      server.watcher.on('unlinkDir', (dirPath: string) => {
        if (dirPath.includes('public/post')) generateIndex()
      })
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), blogIndexPlugin()],
})
