import db from "../config/db.js"

export async function listarReservas(req, res) {
  try {
    const [rows] = await db.execute(`
      SELECT 
        r.id AS reserva_id,
        r.data_retirada,
        r.data_devolucao,
        r.confirmado_email,
        r.criado_em,

        u.id AS usuario_id,
        u.nome AS usuario_nome,
        u.email AS usuario_email,

        l.id AS livro_id,
        l.titulo AS livro_titulo,
        l.autor AS livro_autor
      FROM reservas AS r
      INNER JOIN usuarios AS u ON r.usuario_id = u.id
      INNER JOIN livros AS l ON r.livro_id = l.id
      ORDER BY r.data_retirada DESC;
    `);

    res.json(rows);

  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}

export async function CriarReserva(req, res) {
  try {
    const { usuario_id, livro_id, data_retirada, data_devolucao, confirmado_email } = req.body;

    // Verifica campos obrigatórios
    if (!usuario_id || !livro_id || !data_retirada || !data_devolucao) {
      return res.status(400).json({ erro: "Dados incompletos para criar reserva." });
    }

    const [result] = await db.execute(`
      INSERT INTO reservas (usuario_id, livro_id, data_retirada, data_devolucao, confirmado_email)
      VALUES (?, ?, ?, ?, ?)
    `, [usuario_id, livro_id, data_retirada, data_devolucao, confirmado_email ?? false]);

    res.json({
      mensagem: "Reserva criada com sucesso!",
      reserva_id: result.insertId
    });

  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}

export async function excluirReserva(req, res) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ erro: "ID da reserva não informado." });
    }

    const [result] = await db.execute(
      "DELETE FROM reservas WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ erro: "Reserva não encontrada." });
    }

    res.json({ mensagem: "Reserva excluída com sucesso!" });

  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}
