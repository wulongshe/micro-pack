import fs from 'fs-extra'
import Mustache from 'mustache'
import path from 'path'
import ora from 'ora'
import { type Options, compiler } from '.'

const tplPath = path.resolve(__dirname, '../template/index.tpl')

export async function build(opt: Options) {
  const spinner = ora()
  const modules = await compiler(path.join(process.cwd(), opt.entry))
  const template = await fs.readFile(tplPath, 'utf-8')
  spinner.start('Building...')
  const result = Mustache.render(template, { modules: Object.values(modules) })
  const output = path.join(process.cwd(), opt.output)
  await fs.mkdir(output, { recursive: true })
  await fs.writeFile(path.join(output, 'index.js'), result)
  spinner.succeed(`Build success!`)
}
