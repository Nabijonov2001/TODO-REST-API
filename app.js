const express = require('express')
const fs = require('fs')
const path = require('path')
const morgan = require('morgan')
const cors = require('cors')
const { PORT } = require('./config')
const app = express()

// middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan('tiny'))
app.use(cors())

// all routes
fs.readdir(path.join(__dirname, 'routes'), (err, files)=>{
    if(!err){
        files.forEach(file=>{
            const Path = path.join(__dirname, 'routes', file)
            const Router = require(Path)
            if(Router.router && Router.path){
                app.use(Router.path, Router.router)
            }
        })
    }
})

app.listen(PORT, ()=>{
    console.log('SERVER IS LISTENING ON PORT ' + PORT)
})