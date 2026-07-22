const { response } = require("express");
const Evento = require("../models/Evento");

const getEventos = async (req, res = response) => {
  const eventos = await Evento.find().populate("user", "name");
  try {
    res.status(200).json({
      ok: true,
      eventos,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};
const crearEventos = async (req, res = response) => {
  Evento;
  console.log(req.body);
  const evento = new Evento(req.body);
  try {
    evento.user = req.uid;
    const eventoGuardadro = await evento.save();
    res.status(201).json({
      ok: true,
      msg: eventoGuardadro,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};
const actualizarEventos = async (req, res = response) => {
  try {
    res.status(201).json({
      ok: true,
      msg: "actualizarEventos",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};
const eliminarEvento = async (req, res = response) => {
  try {
    res.status(201).json({
      ok: true,
      msg: "eliminarEventos",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

module.exports = {
  getEventos,
  actualizarEventos,
  crearEventos,
  eliminarEvento,
};
