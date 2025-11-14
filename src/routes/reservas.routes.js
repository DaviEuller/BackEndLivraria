import express from "express";
import { listarReservas, CriarReserva, excluirReserva } from "../controllers/reservas.controller.js";

const router = express.Router();

router.get("/", listarReservas);

router.post("/", CriarReserva);

router.delete("/:id", excluirReserva)

export default router;
