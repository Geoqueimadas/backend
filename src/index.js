const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();
const PORT = 5000;
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});
const app = express();

app.use(express.json());
app.use(cors());

// Inserir Cadastro

app.post("/inserirCadastro/", async (req, res) => {
  const {
    name,
    email,
    dataNasc,
    telefone,
    cpf,
    senha,
    cep,
    rua,
    numero,
    bairro,
    cidade,
    uf,
  } = req.body;

  try {
    const newCadastro = await pool.query(
      `INSERT INTO usercadastro(name, email, dataNasc, telefone, cpf, senha, cep, rua, numero, bairro, cidade, uf) VALUES ('${name}', '${email}', '${dataNasc}', '${telefone}' , '${cpf}' , '${senha}' , '${cep}' , '${rua}' , '${numero}' , '${bairro}' , '${cidade}' , '${uf}')`
    );
    return res.status(200).send(newCadastro.rows);
  } catch (err) {
    return res.status(400).send(err);
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
