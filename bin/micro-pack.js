#!/usr/bin/env node
const yargs = require('yargs')
const { build } = require('../dist/index.js')

yargs.option('entry', {
  alias: 'e',
  describe: 'Entry file',
  type: 'string',
  demandOption: true,
}).option('output', {
  alias: 'o',
  describe: 'Output file',
  type: 'string',
  demandOption: true,
})

const { argv } = yargs
build(argv)
