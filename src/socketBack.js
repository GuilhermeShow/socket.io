import io from "./server.js";

const documentos = [
    {
        nome: "JavaScript",
        texto: "Texto JavaScript",
    },
    {
        nome: "Node",
        texto: "Texto Node",
    },
    {
        nome: "React",
        texto: "Texto React",
    },
    {
        nome: "Socket.IO",
        texto: "Texto Socket.io",
    },
]

io.on("connection", (socket) => {
    console.log(`Id: ${socket.id}`)

    socket.on("selecionar_documento", (nomeDocumento) => {
        socket.join(nomeDocumento)
        const documento = encontrarDocumento(nomeDocumento)

        if(documento) {
            socket.emit("texto_documento", documento.texto);
        }
    })

    socket.on("texto_editor", (texto, nomeDocumento) => {

        const documento = encontrarDocumento(nomeDocumento);

        if(documento) {
            documento.texto = texto
            socket.to(nomeDocumento).emit("texto_editor_cliente", texto)
        }

    })
})

function encontrarDocumento(nome) {
    const documento = documentos.find((documento) => {
        return documento.nome === nome;
    })

    return documento;
}