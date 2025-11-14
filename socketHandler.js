
const socketIO = require('socket.io')
let io;

const initSocket = (server) => {
    io = socketIO(server);
    io.on('connection', (socket) => {
        console.log("Socket connected")
        socket.on('hello',()=>{
            console.log("auth registered")
        })
        socket.on('j',()=>{
            console.log("reg")
        })
    })
    return io
}

const getIO = () => {
    if (!io) {
        throw new Error('Socket.IO not initialized!');
      }
      return io;
}


module.exports = {
    initSocket,
    getIO, 
}
