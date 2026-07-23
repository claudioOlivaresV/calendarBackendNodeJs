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
  const eventoID = req.params.id;

  const uid = req.uid;
  try {
    const evento = await Evento.findById(eventoID);
    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: "Evento no existe",
      });
    }
    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "sin privilegios",
      });
    }

    const nuevoEvento = {
      ...req.body,
      user: uid,
    };
    const eventoActualizado = await Evento.findByIdAndUpdate(
      eventoID,
      nuevoEvento,
      { new: true },
    );

    res.status(200).json({
      ok: true,
      evento: eventoActualizado,
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
  const eventoID = req.params.id;

  const uid = req.uid;
  try {
    const evento = await Evento.findById(eventoID);
    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: "Evento no existe",
      });
    }
    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "sin privilegios",
      });
    }

    const nuevoEvento = {
      ...req.body,
      user: uid,
    };
    await Evento.findByIdAndDelete(eventoID);

    res.status(200).json({
      ok: true,
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
