

// const path = require('path')

// var pathobj = path.parse(__filename)

// console.log(pathobj)


const os = require('os')

var totalmemory = os.totalmem()
var freememory = os.freemem()

console.log("Total Memory:"+totalmemory)
console.log("Free Memory:"+freememory)

