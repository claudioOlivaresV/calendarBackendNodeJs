const { response } = require("express");

const { validationResult } = require("express-validator");
const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");

const crearUsuario = async (req, res = response) => {
  const { email, name, password } = req.body;

  try {
    let usuario = await Usuario.findOne({ email });

    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: "Usuario ya existe",
      });
    }

    usuario = new Usuario(req.body);

    // Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);
    const token = await generarJWT(usuario.id, usuario.name);

    await usuario.save();

    res.status(201).json({
      ok: true,
      msg: "register",
      email,
      name,
      token,
    });
  } catch (error) {
    console.log(error); // Muy importante para ver el error real

    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

const loginUsuario = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    let usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: "Usuario no existe",
      });
    }
    //Confirmar password

    const validPassword = bcrypt.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Password incorrecto",
      });
    }

    const token = await generarJWT(usuario.id, usuario.name);
    res.status(200).json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token,
    });
  } catch (error) {
    console.log(error); // Muy importante para ver el error real

    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

const revalidarToken = async (req, res = response) => {
  const uid = req.uid;
  const name = req.name;

  const token = await generarJWT(uid, name);

  console.log("se requier el /");
  res.json({
    ok: true,
    msg: "renew",
    uid,
    name,
    token,
  });
};

module.exports = { crearUsuario, loginUsuario, revalidarToken };
