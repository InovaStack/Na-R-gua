const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcryptjs");
const cors = require("cors");
const app = express();
const db = new sqlite3.Database("banco.db");

// Middleware
app.use(cors());
app.use(express.json());

// Cria tabela se não existir
db.run(`
  CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    senha TEXT NOT NULL
  )
`);

// Cadastro
app.post("/api/cadastrar", (req, res) => {
  const { usuario, email, senha } = req.body;
  const hash = bcrypt.hashSync(senha, 10);

  db.run(
    "INSERT INTO usuarios (usuario, email, senha) VALUES (?, ?, ?)",
    [usuario, email, hash],
    function (err) {
      if (err) return res.status(400).json({ erro: "E-mail já cadastrado" });
      res.json({ sucesso: true });
    }
  );
});

// Login
app.post("/api/login", (req, res) => {
  const { email, senha } = req.body;

  db.get("SELECT * FROM usuarios WHERE email = ?", [email], (err, user) => {
    if (!user) return res.status(401).json({ erro: "Usuário não encontrado" });

    const senhaCorreta = bcrypt.compareSync(senha, user.senha);
    if (!senhaCorreta) return res.status(401).json({ erro: "Senha incorreta" });

    res.json({ sucesso: true, nome: user.usuario });
  });
});

// Inicia o servidor
app.listen(3000, () => console.log("Servidor rodando em http://localhost:3000"));
