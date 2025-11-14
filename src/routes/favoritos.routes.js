import express from "express";
import { listarFavoritos, criarfav, excluirfav } from "../controllers/favoritos.controller.js";


const router = express.Router();

router.get("/", listarFavoritos);
router.post("/", criarfav);
router.delete("/:id", excluirfav);

export default router