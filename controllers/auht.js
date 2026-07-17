const { response } = require("express");

const { validationResult } = require("express-validator");

const crearUsuario = (req, res = response) => {
  console.log(req.body);
  const { email, name, password } = req.body;

  console.log("se requier el /");
  res.status(201).json({
    ok: true,
    msg: "register",
    email,
    name,
    password,
  });
};

const loginUsuario = (req, res = response) => {
  const { email, password } = req.body;
  console.log("se requier el /");
  res.json({
    ok: true,
    msg: "login",
    email,
    password,
  });
};

const revalidarToken = (req, res = response) => {
  console.log("se requier el /");
  res.json({
    ok: true,
    msg: "renew",
  });
};

module.exports = { crearUsuario, loginUsuario, revalidarToken };
