//callbags - express module
const {createExpressSource,processEP,assignEndPoints,startWithExpress} = require('./callbags-express')
module.exports.callbagsExpress = {createExpressSource,processEP,assignEndPoints, startWithExpress}
//callbags - low module
const {createLowDBSource} = require('./callbags-lowdb')
module.exports.callbagsLowDB = {createLowDBSource}
//callbags utils
const {forEachAsync,startWithAsyncTask,inject,asyncMap} = require('./callbags-utils')
module.exports.callbagsUtils = {forEachAsync,startWithAsyncTask,inject,asyncMap}

