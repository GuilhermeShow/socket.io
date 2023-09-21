import express from "express";
import path from "path";
import url from "url";
import http from "http";
import { Server } from "socket.io";

const app = express()

const port = process.env.PORT || 8000

const caminhoAtual = url.fileURLToPath(import.meta.url);
const diretorio = path.join(caminhoAtual, "../..", "public")

app.use(express.static(diretorio));

const servidor = http.createServer(app);

servidor.listen(port, () => {
    console.log(`Servidor ligado na porta: 8000`)
})

const io = new Server(servidor)

export default io;