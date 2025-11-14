import db from "../config/db.js"

 export async function listarFavoritos (req, res) {
    try{
        const [rows] = await db.execute(`
            SELECT 
                f.id AS favorito_id,
                u.id AS usuario_id,
                u.nome AS usuario_nome,
                u.email AS usuario_email,
                l.id AS livro_id,
                l.titulo AS livro_titulo,
                l.autor AS livro_autor,
                l.genero AS livro_genero
            FROM favoritos AS f
            INNER JOIN usuarios AS u ON f.usuario_id = u.id
            INNER JOIN livros AS l ON f.livro_id = l.id
            ORDER BY u.nome, l.titulo;

        `)

        res.json(rows);
    } catch (err) {
    res.status(500).json({ erro: err.message });
    }
};

export async function criarfav(req, res) {
    try {
        const { usuario_id, livro_id } = req.body;

        if (!usuario_id || !livro_id) {
            return res.status(400).json({ erro: "Dados incompletos para criar reserva." });
        }

        const [result] = await db.execute(`
            INSERT INTO favoritos (usuario_id, livro_id) VALUES (?, ?)
        `, [usuario_id, livro_id]);   

        res.json({
            mensagem: "Reserva criada com sucesso!",
            reserva_id: result.insertId
        });

    } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}

export async function excluirfav(req, res) {

    try {
        const { id } = req.params;

        if (!id) {
        return res.status(400).json({ erro: "ID da favoritos não informado." });
        }

        const [result] = await db.execute(
        "DELETE FROM favoritos WHERE id = ?",
        [id ]
        );

        if (result.affectedRows === 0) {
        return res.status(404).json({ erro: "favorito não encontrado." });
        }

        res.json({ mensagem: "favorito excluído com sucesso!" });

    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};