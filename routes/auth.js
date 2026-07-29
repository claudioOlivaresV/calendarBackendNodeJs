const express = require("express");
const {
  crearUsuario,
  loginUsuario,
  revalidarToken,
} = require("../controllers/auht");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validatJWT } = require("../middlewares/validar-jwt");
const router = express.Router();
/**
 * @swagger
 * /auth/new:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     description: Crea una nueva cuenta de usuario y devuelve un JWT junto con la información básica del usuario.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Claudio Olivares
 *               email:
 *                 type: string
 *                 format: email
 *                 example: claudio@test.com
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 6
 *                 example: 123456
 *     responses:
 *       201:
 *         description: Usuario registrado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 uid:
 *                   type: string
 *                   example: 6892a1b3f45d8b1234567890
 *                 name:
 *                   type: string
 *                   example: Claudio Olivares
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Error de validación o el usuario ya existe.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: El usuario ya existe con ese correo.
 *       500:
 *         description: Error interno del servidor.
 */
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
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: usuario@test.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login exitoso
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: Credenciales incorrectas
 */
router.post(
  "/login",
  [
    check("email", "EL email es obligatorio").isEmail(),
    check("password", "EL pasword es obligatorio y de 6 carqacteres").isLength({
      min: 6,
    }),
    validarCampos,
  ],
  loginUsuario,
);
/**
 * @swagger
 * /auth/renew:
 *   get:
 *     summary: Renovar JWT
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token renovado correctamente
 *       401:
 *         description: Token inválido o expirado
 */
router.get("/renew", validatJWT, revalidarToken);

module.exports = router;
