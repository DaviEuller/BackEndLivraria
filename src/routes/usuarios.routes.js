import {criarUsuario, DeletarUsuario, obterUsuario, listarUsuarios, atualizarUsuario} from "../controllers/usuarios.controller.js"
import express from "express"


const route = express.Router();

route.post("/", criarUsuario)
route.get("/", listarUsuarios)
route.get("/:id", obterUsuario)
route.put("/:id", atualizarUsuario)
route.delete("/:id", DeletarUsuario)

export default route 