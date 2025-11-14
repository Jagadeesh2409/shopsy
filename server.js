const express = require('express')
const app = express()
require('dotenv').config()

const { createServer } = require('http');
const server = createServer(app);
const { join } = require('path');
const { initSocket ,getIO} = require('./socketHandler');
const {errorHandler} = require('./utils/error')
const {sessionObj} = require('./config/googleConfig')
const session = require('express-session')

const authRoute = require('./routes/authRoute')

 const io = initSocket(server);
 app.io = io

app.use(session(sessionObj))

app.use(express.json())




app.use('/auth',authRoute)

app.use(errorHandler)


app.get('/upload',(req,res)=>{})

server.listen(process.env.PORT,()=>{
    console.log("server is running in http://localhost:3000")
})