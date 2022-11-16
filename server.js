express = require('express');
const fs = require('fs');

const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

const app = express();
const httpServer = new HttpServer(app);

const io = new IOServer(httpServer);

const mensajes = [];
const productos = [];

app.use(express.static(__dirname + '/public'));

io.on('connection', socket => {

    socket.emit('mensajes', mensajes);

    socket.on('nuevo-mensaje', data => {
        mensajes.push(data);
        fs.writeFileSync('./chat/chat.txt', JSON.stringify(mensajes));
        io.sockets.emit('mensajes', mensajes);
    })
});


io.on('connection', socket => {

    socket.emit('productos', productos);

    socket.on('nuevo-productos', data => {
        productos.push(data);
        io.sockets.emit('productos', productos);
    })
});


const port = 8080;

const server = httpServer.listen(port, () => {
    console.log(`corriendo en http://localhost:${port}`);
});
server.on('error', error => console.log(`Error en servidor ${err}`));
