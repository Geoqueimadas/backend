const express = require("express");
const FormularioRegister = express();

const formularioRegisterController = require("../controllers/FormularioRegister");

FormularioRegister.get("/getformulario", formularioRegisterController.index);
FormularioRegister.post("/postformulario", formularioRegisterController.store);
FormularioRegister.delete(
  "/delformulario/:id",
  formularioRegisterController.delet
);
FormularioRegister.put(
  "/putformulario/:id",
  formularioRegisterController.updat
);

module.exports = FormularioRegister;
