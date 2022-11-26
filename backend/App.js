const express = require("express");
const delay = require("express-delay");
const cors = require("cors");

const contactRoute = require("./src/routes/contact");
const registerRoute = require("./src/routes/register");
const formularioRegisterRoute = require("./src/routes/formularioRegister");

const app = express();
app.use(express.json());
app.use(express.Router());
app.use(express.urlencoded({ extended: false }));

app.use(delay(1000));

const whiteList = ["http://localhost:3000"];

const corsOptions = {
  origin(origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(cors(corsOptions));

//rotas mensagens
app.get("/selectcontact", contactRoute);
app.post("/postcontact", contactRoute);

// ara quem quiser testar pelo Gmail é simples também: Vá no seu painel de controle da conta Google, remover a autenticação de dois fatores e ativar a opção 'less secure apps'. Depois no código, adicionar no método 'createTransport' o chave/valor de service: 'gmail' e remover host e port.

const multerConfig = require("./src/config/multerConfig");
app.get("/uploads", multerConfig.single("upload"), async (req, res) => {
  if (req.file) {
    return res.json({
      erro: false,
      msg: "Enviado com sucesso",
    });
  }

  return res.status(404).json({
    erro: true,
    msg: "Não foi possivel enviar o arquivo",
  });
});

//rotas de cadastro
app.get("/getregister", registerRoute);
app.post("/register", registerRoute);
app.post("/postformulario", formularioRegisterRoute);
app.delete("/delregister/:id", registerRoute);
app.put("/putregister/:id", registerRoute);

module.exports = app;
