import {criarLivro, DeletarLivro, 
    obterLivro, 
    listarLivros, 
    atualizarLivro} from "../controllers/livros.controller.js"
import express from "express"


const route = express.Router();

route.post("/", criarLivro)
route.get("/", listarLivros)
route.get("/:id", obterLivro)
route.put("/:id", atualizarLivro)
route.delete("/:id", DeletarLivro)

export default route 