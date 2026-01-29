import {createServer} from 'http'
import express from 'express'
import {Server} from 'socket.io'
import path from 'path';

const app=express();
const httpserver=  createServer(app);

app.use(express.static(path.resolve('./public')))

const io=new Server(httpserver,{
     cors:{
     origin:"*",
}})

io.on('connection',(socket)=>{
    console.log(`connected:${socket.id}`);
    socket.on('join:club',(data)=>{
        const {name,email,room}=data;
        console.log(name,email,room);
        socket.join(room);
        console.log(`${name} has joined the room no:${room}`);
        io.to(room).emit('join:draw',{name,room,id:socket.id,email});
    })
  // On your Server
socket.on('coordinates', (data) => {
    // We are now passing the whole object (x1, y1, x2, y2)
    // .to(data.room) ensures only people in that specific room see it
    socket.to(data.room).emit('coordinates', data);
});
    socket.on('stop-drawing',(data)=>{
         socket.to(data.room).emit('stop-drawing')
    })
})

httpserver.listen(8000,()=>{
    console.log('Socket.io server running on port 8000');
})