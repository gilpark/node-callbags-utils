module.exports.createExpressSource = (port, setupProcess = null) => (start,sink) => {
    if(start !== 0) return
    const app = express()
    if(typeof setupProcess === "function"){
        setupProcess(app)
    }
    app.set('port',(process.env.PORT || port))
    sink(-1, app) //set app
    sink(0, t => {
        if(t === 2){
            console.log('clean up')
        }
    })
    // https.createServer({}, app).listen(app.get('port'))
    app.listen(app.get('port'), function () {
        console.log(`[${getDateTime()}] NextNow services are running on port`, app.get('port'))
    })
}
//note: 너무 어렵다. 하지만 좋은 효과, sink콜백을 받아서 차후에 데이터를 넘길수 있다.
//좀더 다목적으로 만드는게 좋겠다.
module.exports.processEP = (path,isPost = false) => fn => {
    return source => (start, sink) => {
        if (start !== 0) return
        source(0, (t, d) => {
            if (t === -1) {
                let app = d
                let handler = fn(sink)
                if (isPost) {
                    app.post(path, handler)
                } else {
                    app.get(path, handler)
                }
                sink(-1, app)
            } else {
                sink(t, d)
            }

        })
    }
}
module.exports.assignEndPoints = (...endpoints) =>{
    return source => (start,sink) =>{
        if(start !== 0) return
        source(0, (t, d) => {
            if (t === -1) {
                let app = d
                for(let i = 0; i < endpoints.length; i++){
                    let{endpoint,method} = endpoints[i]
                    if(method.toLowerCase() ==='get'){
                        app.get(endpoint, (req,res) => sink(1,{endpoint,req,res}))
                    }else if(method.toLowerCase() ==='post'){
                        app.post(endpoint, (req,res) => sink(1,{endpoint,req,res}))
                    }else if(method.toLowerCase() ==='delete'){
                        app.delete(endpoint, (req,res) => sink(1,{endpoint,req,res}))
                    }else{
                        console.warn(`${method} has not implemented`)
                        app.all(endpoint,(req,res) => sink(1,{endpoint,req,res}))
                    }
                }
                sink(-1,app)
            } else{
                sink(t, d)
            }
        })
    }
}
