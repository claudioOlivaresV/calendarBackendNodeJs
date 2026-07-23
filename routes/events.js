const express = require("express");
const { validatJWT } = require("../middlewares/validar-jwt");
const { check } = require("express-validator");

const {
  getEventos,
  crearEventos,
  actualizarEventos,
  eliminarEvento,
} = require("../controllers/events");
const { validarCampos } = require("../middlewares/validar-campos");
const { isDate } = require("../helpers/isDate");

const router = express.Router();

//todas tiene que pasar por la validacion del JWT

router.use(validatJWT);

//obetenerEventos
router.get("/", getEventos);

router.post(
  "/",
  [
    check("title", "El titulo es obligatorio").not().isEmpty(),
    check("start", "Fecha inicio obligatoria").custom(isDate),
    check("end", "Fecha fin obligatoria").custom(isDate),
    validarCampos,
  ],
  crearEventos,
);

router.put(
  "/:id",
  [
    check("title", "El titulo es obligatorio").not().isEmpty(),
    check("start", "Fecha inicio obligatoria").custom(isDate),
    check("end", "Fecha fin obligatoria").custom(isDate),
    validarCampos,
  ],
  actualizarEventos,
);

router.delete("/:id", eliminarEvento);

module.exports = router;
