// toggle-proxy.ts
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// Compatible with ES module __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const astroConfigPath = path.resolve(__dirname, '../astro.config.ts')

// Helper to comment/uncomment adapter lines in astro.config.ts
function toggleAstroAdapter(comment: boolean) {
  const astroConfig = fs.readFileSync(astroConfigPath, 'utf-8').split('\n')
  // 16: import netlify..., 19: adapter: netlify() (0-based)
  const importIdx = 16
  const adapterIdx = 19
  if (comment) {
    if (!astroConfig[importIdx].trim().startsWith('//')) {
      astroConfig[importIdx] = '// ' + astroConfig[importIdx]
    }
    if (!astroConfig[adapterIdx].trim().startsWith('//')) {
      astroConfig[adapterIdx] = '// ' + astroConfig[adapterIdx]
    }
  } else {
    if (astroConfig[importIdx].trim().startsWith('//')) {
      astroConfig[importIdx] = astroConfig[importIdx].replace(/^\/\/\s?/, '')
    }
    if (astroConfig[adapterIdx].trim().startsWith('//')) {
      astroConfig[adapterIdx] = astroConfig[adapterIdx].replace(/^\/\/\s?/, '')
    }
  }
  fs.writeFileSync(astroConfigPath, astroConfig.join('\n'), 'utf-8')
}
