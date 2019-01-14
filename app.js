//import server
var app = require('./config/server');

//door listen
var server = app.listen(80, function () {
    console.log("Servidor ouvindo na porta 80");
});

var io = require('socket.io').listen(server);
app.set('io', io);

//create conexion with websocket
io.on('connection', function (socket) {
    console.log('usuario conectado');

    socket.on('disconnect', function () {
        console.log('usuario desconectou');
    });

    //chat entre usuarios
    socket.on('msgServidor', function (data) {

        socket.emit(
            'msgClienteEnvia',
            {
                apelido: data.apelido,
                mensagem: data.mensagem
            }
        )
        socket.broadcast.emit(
            'msgClienteRecebe',
            {
                apelido: data.apelido,
                mensagem: data.mensagem
            }
        )

        //participantes
        if (parseInt(data.apelidoCliente) == 0) {
            socket.emit(
                'participanteCliente',
                {
                    apelido: data.apelido
                }
            )

            socket.broadcast.emit(
                'participanteCliente',
                {
                    apelido: data.apelido
                }
            )
        }
    });
});