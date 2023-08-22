const { add } = require('./add.js')
const path = require('path')

console.log('Hello World')
console.log(add(3, 4))
console.log(path.resolve(__dirname, 'index.js'))