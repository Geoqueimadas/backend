const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const pool = new Pool({
    dialect: process.env.DIALECT,
    user: process.env.USER,
    host: process.env.HOST,
    password: process.env.PASSWORD,
    port: process.env.PORT,
    database: process.env.DATABASE
});

module.exports = {pool,};
