const { pool } = require('../database/database');
const validator = require('validator');
const express = require('express');

express.urlencoded({extended: false});

async function index(req, res){
    try {
        const query = await pool.query(
            `SELECT * FROM "Cadastro"`
        ).then((response)=> res.json(response.rows));
    
        return query 
    } catch (e) {
        console.log(e)
    }
};

async function store(req, res){
    var remoteIp = (req.headers['x-forwarded-for'] || '').split(',').pop() || // Recupera o IP de origem, caso a fonte esteja utilizando proxy
        req.connection.remoteAddress || // Recupera o endereço remoto da chamada
        req.socket.remoteAddress || // Recupera o endereço através do socket TCP
        req.connection.socket.remoteAddress // Recupera o endereço através do socket da conexão


    const { nome, email, dataNasc, telefone, cpf, senha, cep, rua,
        num, bairro, cidade, uf, } = req.body;

    try {
        //validações com validator
        if(!validator.isEmail(email)) return res.json('E-mail inválido');
        if(!validator.isStrongPassword(senha, [{
            minLength: 6, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1
        }])) return res.json('Senha precisa estar no formato adequado de segurança');
        if(!validator.isNumeric(telefone)) return res.json('O telefone não pode ter letra');
        if(!validator.isNumeric(cpf)) return res.json('O CPF não pode ter letra');
        if(!validator.isNumeric(cep)) return res.json('O CEP não pode ter letra');


        const query = await pool.query(
            `
                INSERT INTO "Cadastro" ("Nome", "Email", "Data_nasc", "Telefone",
                    "Cpf", "Senha", "Cep", "Rua", "Num", "Bairro", "Cidade", "UF") 
                VALUES('${nome}', '${email}', '${dataNasc}', '${telefone}', '${cpf}', '${senha}', '${cep}', '${rua}', '${num}', '${bairro}', '${cidade}', '${uf}')
            `
        );
        
        res.json(['Cadastrado com sucesso!', `IP da maquina: ${remoteIp}`]);
        return query;
    } catch (e) {
        console.log(e);
        return res.json(e);
    };
};

async function delet(req, res){
    const {id} = req.params;
    try {
        const query = await pool.query(
            `DELETE FROM "Cadastro" WHERE "ID" = ${parseInt(id)}`
        );
        res.json('Deletado com sucesso');
        return query
    } catch (e) {
        console.log(e)
    }
}

async function updat(req, res){
    const {id} = req.params;
    const { nome, email, dataNasc, telefone, cpf, senha, cep, rua,
        num, bairro, cidade, uf, } = req.body;
    try {
        const query = await pool.query(
            `UPDATE "Cadastro" SET ("Nome", "Email", "Data_nasc", "Telefone",
            "Cpf", "Senha", "Cep", "Rua", "Num", "Bairro", "Cidade", "UF") = 
            ('${nome}', '${email}', '${dataNasc}', '${telefone}', '${cpf}', '${senha}', '${cep}', '${rua}', '${num}', '${bairro}', '${cidade}', '${uf}') 
            WHERE "ID" = ${id}`
        );
        res.json('Atualizado com sucesso');
        return query
    } catch (e) {
        console.log(e)
    }
}

module.exports = { index, store, delet, updat };
