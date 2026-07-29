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
/**
 * @swagger
 * /events:
 *   get:
 *     summary: Obtener todos los eventos
 *     description: Devuelve la lista de eventos asociados al usuario autenticado.
 *     tags:
 *       - Eventos
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de eventos obtenida correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 eventos:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 6892a1b3f45d8b1234567890
 *                       title:
 *                         type: string
 *                         example: Reunión de Sprint
 *                       notes:
 *                         type: string
 *                         example: Revisar avances del proyecto
 *                       start:
 *                         type: string
 *                         format: date-time
 *                         example: 2026-07-29T09:00:00.000Z
 *                       end:
 *                         type: string
 *                         format: date-time
 *                         example: 2026-07-29T10:00:00.000Z
 *                       user:
 *                         type: string
 *                         example: 6892a1b3f45d8b1234567891
 *       401:
 *         description: No autorizado. Token inválido o no enviado.
 *       500:
 *         description: Error interno del servidor.
 */
router.get("/", getEventos);

/**
 * @swagger
 * /events:
 *   post:
 *     summary: Crear un nuevo evento
 *     description: Crea un nuevo evento para el usuario autenticado.
 *     tags:
 *       - Eventos
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - start
 *               - end
 *             properties:
 *               title:
 *                 type: string
 *                 example: Reunión de planificación
 *               notes:
 *                 type: string
 *                 example: Revisar el avance del sprint.
 *               start:
 *                 type: string
 *                 format: date-time
 *                 example: 2026-07-29T09:00:00.000Z
 *               end:
 *                 type: string
 *                 format: date-time
 *                 example: 2026-07-29T10:00:00.000Z
 *     responses:
 *       201:
 *         description: Evento creado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 msg:
 *                   type: string
 *                   example: Evento creado
 *                 evento:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 6892a1b3f45d8b1234567890
 *                     title:
 *                       type: string
 *                       example: Reunión de planificación
 *                     notes:
 *                       type: string
 *                       example: Revisar el avance del sprint.
 *                     start:
 *                       type: string
 *                       format: date-time
 *                     end:
 *                       type: string
 *                       format: date-time
 *                     user:
 *                       type: string
 *                       example: 6892a1b3f45d8b1234567891
 *       400:
 *         description: Error de validación en los datos enviados.
 *       401:
 *         description: No autorizado. Token inválido o ausente.
 *       500:
 *         description: Error interno del servidor.
 */
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

/**
 * @swagger
 * /events/{id}:
 *   put:
 *     summary: Actualizar un evento
 *     description: Actualiza un evento existente del usuario autenticado.
 *     tags:
 *       - Eventos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del evento
 *         schema:
 *           type: string
 *           example: 6892a1b3f45d8b1234567890
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - start
 *               - end
 *             properties:
 *               title:
 *                 type: string
 *                 example: Reunión de seguimiento
 *               notes:
 *                 type: string
 *                 example: Revisar tareas pendientes.
 *               start:
 *                 type: string
 *                 format: date-time
 *                 example: 2026-07-29T14:00:00.000Z
 *               end:
 *                 type: string
 *                 format: date-time
 *                 example: 2026-07-29T15:00:00.000Z
 *     responses:
 *       200:
 *         description: Evento actualizado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 evento:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 6892a1b3f45d8b1234567890
 *                     title:
 *                       type: string
 *                       example: Reunión de seguimiento
 *                     notes:
 *                       type: string
 *                       example: Revisar tareas pendientes.
 *                     start:
 *                       type: string
 *                       format: date-time
 *                     end:
 *                       type: string
 *                       format: date-time
 *                     user:
 *                       type: string
 *                       example: 6892a1b3f45d8b1234567891
 *       400:
 *         description: Error de validación.
 *       401:
 *         description: No autorizado.
 *       404:
 *         description: Evento no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
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

/**
 * @swagger
 * /events/{id}:
 *   delete:
 *     summary: Eliminar un evento
 *     description: Elimina un evento perteneciente al usuario autenticado.
 *     tags:
 *       - Eventos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del evento a eliminar
 *         schema:
 *           type: string
 *           example: 6892a1b3f45d8b1234567890
 *     responses:
 *       200:
 *         description: Evento eliminado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 msg:
 *                   type: string
 *                   example: Evento eliminado correctamente
 *       401:
 *         description: No autorizado. Token inválido o ausente.
 *       404:
 *         description: Evento no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.delete("/:id", eliminarEvento);

module.exports = router;
