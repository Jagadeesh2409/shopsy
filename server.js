const express = require('express')
const app = express()
require('dotenv').config()

const { createServer } = require('http');
const server = createServer(app);
const { join } = require('path');
const { initSocket } = require('./socketHandler');

initSocket(server);

app.use(express.json())


app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});


server.listen(process.env.PORT,()=>{
    console.log("server is running in http://localhost:3000")
})