const { pool } = require("../database/database");
const validator = require("validator");
const express = require("express");
const nodemailer = require("nodemailer");

express.urlencoded({ extended: false });

async function index(req, res) {
  try {
    const query = await pool
      .query(`SELECT * FROM formulario`)
      .then((response) => res.json(response.rows));

    return query;
  } catch (e) {
    console.log(e);
  }
}

async function store(req, res) {
  var remoteIp =
    (req.headers["x-forwarded-for"] || "").split(",").pop() || // Recupera o IP de origem, caso a fonte esteja utilizando proxy
    req.connection.remoteAddress || // Recupera o endereço remoto da chamada
    req.socket.remoteAddress || // Recupera o endereço através do socket TCP
    req.connection.socket.remoteAddress; // Recupera o endereço através do socket da conexão
  const user = "rafacesar0070@gmail.com";
  const pass = "flamengo00";
  const { nome, email, endereco } = req.body;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    secure: false,
    auth: {
      user: "rafacesar0070@gmail.com",
      pass: "ueervfdsenxxbhev",
    },
  });

  try {
    const query = await pool.query(
      `
                INSERT INTO formulario (nome, email, endereco) 
                VALUES('${nome}', '${email}', '${endereco}')
            `
    );
    transporter
      .sendMail({
        from: user,
        to: user,
        replyTo: "rafacesar0070@gmail.com",
        subject: "Alerta de Queimada",
        text: `Alerta de queimada no seguinte endereço: ${endereco}`,
      })
      .then((info) => {
        res.send(info);
      })
      .catch((error) => {
        res.send(error);
      });

    res.json(["Cadastrado com sucesso!", `IP da maquina: ${remoteIp}`]);
    return query;
  } catch (e) {
    console.log(e);
    return res.json(e);
  }
}

async function delet(req, res) {
  const { id } = req.params;
  try {
    const query = await pool.query(
      `DELETE FROM "formulario" WHERE "id" = ${parseInt(id)}`
    );
    res.json("Deletado com sucesso");
    return query;
  } catch (e) {
    console.log(e);
  }
}

async function updat(req, res) {
  const { id } = req.params;
  const { nome, email, endereco } = req.body;
  try {
    const query = await pool.query(
      `UPDATE "formulario" SET ("Nome", "Email", "Endereco" = 
            ('${nome}', '${email}', '${endereco}') 
            WHERE "ID" = ${id}`
    );
    res.json("Atualizado com sucesso");
    return query;
  } catch (e) {
    console.log(e);
  }
}

module.exports = { index, store, delet, updat };
