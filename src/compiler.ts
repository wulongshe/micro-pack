import fs from 'fs-extra'
import path from 'path'
import ora from 'ora'
import { resolve, type Modules } from '.'

const regex = /require\s*\(\s*\'(.*?)\'\s*\)/g

export async function compiler(filepath: string): Promise<Modules> {
  let id = 0
  const modules: Modules = {}
  async function walk(filepath: string) {
    const spinner = ora()
    spinner.start(`Compiling ${filepath}`)
    if (modules[filepath]) return modules
    const code = await fs.readFile(filepath, 'utf-8')
    modules[filepath] = { id: id++, code }
    const depMap = track(path.dirname(filepath), code)
    const deps = Object.values(depMap)
    await Promise.all(deps.map(walk))
    modules[filepath].code = code.replace(regex, (_, p1) =>
      modules[depMap[p1]] ? `_require('${modules[depMap[p1]].id}')` : `require('${p1}')`,
    )
    spinner.succeed(`Compiled ${filepath}`)
  }
  await walk(filepath)
  return modules
}

export function track(dirname: string, code: string) {
  const depMap: Record<string, string> = {}
  let match
  while ((match = regex.exec(code)) !== null) {
    const depPath = resolve(dirname, match[1])
    depPath && (depMap[match[1]] = depPath)
  }
  return depMap
}
