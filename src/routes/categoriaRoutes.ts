import { Router } from "express";
import {
  createCategoria,
  getAllCategorias,
  getCategoriaById,
  deleteCategoriaById,
  updateCategoria,
  addEventoToCategoria
} from '../controller/categoriaController';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Categoria:
 *       type: object
 *       required:
 *         - nombre
 *       properties:
 *         id:
 *           type: string
 *           description: ID generado por MongoDB
 *         nombre:
 *           type: string
 *           description: Nombre de la categoría
 *         eventos:
 *           type: array
 *           items:
 *             type: string
 *           description: ID de los eventos asociados a la categoría
 *       example:
 *         nombre: "Conciertos"
 *         eventos: ["648a1b2c3d4e5f6a7b8c9d0e", "648a1b2c3d4e5f6a7b8c9d0f"]
 */

/**
 * @swagger
 * /api/categoria:
 *   post:
 *     summary: Crear una nueva categoría
 *     tags: [Categorías]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Categoria'
 *     responses:
 *       201:
 *         description: Categoría creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Categoria'
 *       400:
 *         description: Error en la solicitud
 */
router.post('/', createCategoria);

/**
 * @swagger
 * /api/categoria:
 *   get:
 *     summary: Obtener todas las categorías
 *     tags: [Categorías]
 *     responses:
 *       200:
 *         description: Lista de categorías obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Categoria'
 *       400:
 *         description: Error en la solicitud
 */
router.get('/', getAllCategorias);

/**
 * @swagger
 * /api/categoria/{id}:
 *   get:
 *     summary: Obtener una categoría por ID
 *     tags: [Categorías]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la categoría
 *     responses:
 *       200:
 *         description: Categoría encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Categoria'
 *       404:
 *         description: Categoría no encontrada
 *       400:
 *         description: Error en la solicitud
 */
router.get('/:id', getCategoriaById);

/**
 * @swagger
 * /api/categoria/{id}:
 *   delete:
 *     summary: Eliminar una categoría por ID
 *     tags: [Categorías]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la categoría
 *     responses:
 *       200:
 *         description: Categoría eliminada exitosamente
 *       404:
 *         description: Categoría no encontrada
 *       400:
 *         description: Error en la solicitud
 */
router.delete('/:id', deleteCategoriaById);

/**
 * @swagger
 * /api/categoria/{id}:
 *   put:
 *     summary: Actualizar una categoría por ID
 *     tags: [Categorías]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la categoría
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Categoria'
 *     responses:
 *       200:
 *         description: Categoría actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Categoria'
 *       404:
 *         description: Categoría no encontrada
 *       400:
 *         description: Error en la solicitud
 */
router.put('/:id', updateCategoria);



/**
 * @swagger
 * /api/categoria/{id}/add-evento:
 *   post:
 *     summary: Agregar un evento a una categoría
 *     tags: [Categorías]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la categoría
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               eventoId:
 *                 type: string
 *                 description: ID del evento a agregar
 *     responses:
 *       200:
 *         description: Evento agregado a la categoría exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Categoria'
 *       404:
 *         description: Categoría o evento no encontrado
 *       400:
 *         description: Error en la solicitud
 */
router.post('/:id/add-evento', addEventoToCategoria);

export default router;
