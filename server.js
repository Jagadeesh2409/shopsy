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
const unitRoute = require('./routes/unitRoute')
const categoriesRoute = require('./routes/categoriesRoute')
const productRoute = require('./routes/productRoute')
const discountRoute =  require('./routes/discountRoute')

 const io = initSocket(server);
 app.io = io

app.use(session(sessionObj))

app.use(express.json())

app.use('/uploads', express.static(__dirname + '/uploads'))

app.use('/auth',authRoute)
app.use('/units',unitRoute)
app.use('/categories',categoriesRoute)
app.use('/products',productRoute)
app.use('/discounts',discountRoute)

app.use(errorHandler)


server.listen(process.env.PORT,()=>{
    console.log("server is running in http://localhost:3000")
})