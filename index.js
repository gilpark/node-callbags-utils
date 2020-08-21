//callbags - express module
const {createExpressSource,processEP,assignEndPoints,startWithExpress} = require('./callbags-express')
module.exports.CallbagsExpress = {createExpressSource,processEP,assignEndPoints, startWithExpress}
//callbags - low module
const {createLowDBSource} = require('./callbags-lowdb')
module.exports.CallbagsLowDB = {createLowDBSource}
//callbags utils
const {forEachAsync,startWithAsyncTask,inject,asyncMap} = require('./callbags-utils')
module.exports.CallbagsUtils = {forEachAsync,startWithAsyncTask,inject,asyncMap}

