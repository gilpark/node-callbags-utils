const {pipe, forEach} = require('callbag-basics')
const {addRoutes, createExpressSource, makeRoutes} = require('./lib/node-callbags-utils/callbags-express')
const bodyParser = require('body-parser')

const setExpressOptions = app => {
    app.use(cors())
    app.use(bodyParser.json())
    console.log("express setup done")
}
const homeRoute = makeRoutes('/', 'get' )
const express$ = pipe(
    createExpressSource(3000,setExpressOptions),
    addRoutes(homeRoute)
)

const home$ = homeRoute.connect(express$)

forEach(({res, req}) =>{
    console.log(req.body)
    res.send('hello')
})(home$)


