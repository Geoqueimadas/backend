const { pool } = require("../database/database");
const express = require("express");
express.urlencoded({ extended: false });

async function index(req, res) {
  const query = await pool
    .query(`SELECT * FROM "contato"`)
    .then((response) => res.json(response.rows));

  return query;
}

async function store(req, res) {
  const { nome, email, mensagem } = req.body;

  try {
    const query = await pool.query(
      `
                INSERT INTO "contato" ("nome", "email", "mensagem") VALUES('${nome}', '${email}', '${mensagem}')
            `
    );
    res.json(["Cadastrado com sucesso!"]);
    return query;
  } catch (e) {
    console.log(e);
    return res.json(e);
  }
}

module.exports = { index, store };
