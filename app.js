const express = require("express")
const app = express()
const index = require('./routes/index')
const port = process.env.PORT || 9000
const bodyParser = require('body-parser')
const cluster = require('cluster')
const os = require('os')

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.use('/',index)

if(cluster.isPrimary){
    const cpuThreads = os.cpus().length
    for(let i=0 ; i<cpuThreads ;i++){
      cluster.fork()
    }
    cluster.on('exit',()=>{
      cluster.fork()
    })
    
}else{
  

  app.listen({port:port},()=>{
  console.log(`api running http://localhost:${port}`)
  })
}