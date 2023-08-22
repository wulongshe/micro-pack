import path from 'path'
import fs from 'fs-extra'

export function resolve(dirname: string, filename: string): string | undefined {
  if (filename.startsWith('.')) {
    return path.join(dirname, filename)
  }
  const libPath = resolveLib(process.cwd(), filename)
  if (libPath) return libPath
}

export function resolveLib(dirname: string, filename: string): string | undefined {
  const moduleRoot = path.join(dirname, 'node_modules', filename)
  const pkgPath = path.join(moduleRoot, 'package.json')

  let main = 'index.js'

  if (fs.existsSync(pkgPath)) {
    const pkg = fs.readJsonSync(pkgPath)
    if (pkg.main) main = pkg.main
  }

  const entry = path.join(moduleRoot, main)
  if (fs.existsSync(entry)) return entry

  if (dirname === path.dirname(dirname)) return undefined
  return resolveLib(path.dirname(dirname), filename)
}
