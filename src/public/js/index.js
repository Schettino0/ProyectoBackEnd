const socket = io()

socket.on('mensajeServidor', message => {
    console.log(message)
})

// setInterval(() => {
//     socket.emit("mensajeCliente", "hola")
// }, 2000);

