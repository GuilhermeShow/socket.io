const socket = io();

const parametro = new URLSearchParams(window.location.search);
const nomeDocumento = parametro.get("nome");

const textoEditor = document.getElementById("texto_editor");
const titulo = document.getElementById("titulo");

titulo.textContent = nomeDocumento || "Documento sem titulo"

socket.emit("selecionar_documento", nomeDocumento);

textoEditor.addEventListener("keyup", () => {
    socket.emit("texto_editor", textoEditor.value, nomeDocumento)
})

socket.on("texto_editor_cliente", (texto) => {
    textoEditor.value = texto
})

socket.on("texto_documento", (texto) => {
    textoEditor.value = texto
})