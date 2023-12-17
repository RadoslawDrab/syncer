import { fileURLToPath, URL } from 'node:url'

import { AliasOptions, defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tsconfig from './tsconfig.app.json'

const alias = tsToViteAliases(tsconfig.compilerOptions.baseUrl, tsconfig.compilerOptions.paths)
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias
  }
})

function tsToViteAliases(baseUrl: string, paths: PathsObject): AliasOptions {
  return Object.keys(paths).reduce((acc, pathKey) => {
    const path: string[] = paths[pathKey]
    const starRegex = /\/\*/g

    const pathAliases = path.map((p) =>
      fileURLToPath(new URL(baseUrl + p.replace(starRegex, ''), import.meta.url))
    )
    return {
      ...acc,
      [pathKey.replace(starRegex, '')]: pathAliases
    }
  }, {})
}
type PathsObject = { [key: string]: string[] }