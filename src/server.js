// ============================
//  Dependências
// ============================
import express from "express";

import bodyParser from "body-parser";
import cors from "cors";
import usuariosRoutes from "./routes/usuarios.routes.js"
import livrosRoutes from "./routes/livros.routes.js"
import reservasRoutes from "./routes/reservas.routes.js";
import favoritosRoutes from "./routes/favoritos.routes.js"

// ============================
//  Configuração do servidor
// ============================
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/usuarios", usuariosRoutes);
app.use("/livros", livrosRoutes);
app.use("/reservas", reservasRoutes);
app.use("/favoritos", favoritosRoutes);

// ============================
//  Inicia o servidor
// ============================
const PORT = 3100;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
