const express = require("express");
const {
  crearUsuario,
  loginUsuario,
  revalidarToken,
} = require("../controllers/auht");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const router = express.Router();

router.post(
  "/new",
  [
    check("name", "EL nombre es obligatorio").not().isEmpty(),
    check("email", "EL email es obligatorio").isEmail(),
    check("password", "EL pasword es obligatorio y de 6 carqacteres").isLength({
      min: 6,
    }),
    validarCampos,

    //middlewares
  ],
  crearUsuario,
);
router.post(
  "/",
  [
    check("email", "EL email es obligatorio").isEmail(),
    check("password", "EL pasword es obligatorio y de 6 carqacteres").isLength({
      min: 6,
    }),
    validarCampos,
  ],
  loginUsuario,
);
router.get("/renew", revalidarToken);

module.exports = router;
