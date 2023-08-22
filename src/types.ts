export interface Module {
  id: number
  code: string
}

export interface Modules {
  [key: string]: Module
}

export interface Options {
  entry: string
  output: string
}
