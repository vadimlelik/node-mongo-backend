const express = require('express');
const router = express.Router();
const QualityController = require('../controllers/quality.controller');
const { auth, adminOnly } = require('../middleware/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: Qualities
 *   description: Управление качествами
 */

/**
 * @swagger
 * /api/qualities:
 *   get:
 *     summary: Получить список качеств
 *     tags: [Qualities]
 *     responses:
 *       200:
 *         description: Список качеств
 */
router.get('/', auth, QualityController.getAll);

/**
 * @swagger
 * /api/qualities/{id}:
 *   get:
 *     summary: Получить качество по ID
 *     tags: [Qualities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID качества
 *     responses:
 *       200:
 *         description: Качество найдено
 *       404:
 *         description: Качество не найдено
 */
router.get('/:id', auth, QualityController.getById);

/**
 * @swagger
 * /api/qualities:
 *   post:
 *     summary: Создать качество
 *     tags: [Qualities]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - color
 *             properties:
 *               name:
 *                 type: string
 *               color:
 *                 type: string
 *                 description: Bootstrap цвет (primary, secondary, success, danger, info, dark)
 *     responses:
 *       201:
 *         description: Качество создано
 *       400:
 *         description: Ошибка валидации
 */
router.post('/', auth, QualityController.create);

/**
 * @swagger
 * /api/qualities/{id}:
 *   put:
 *     summary: Обновить качество
 *     tags: [Qualities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID качества
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               color:
 *                 type: string
 *     responses:
 *       200:
 *         description: Качество обновлено
 *       400:
 *         description: Ошибка валидации
 *       404:
 *         description: Качество не найдено
 */
router.put('/:id', auth, QualityController.update);

/**
 * @swagger
 * /api/qualities/{id}:
 *   delete:
 *     summary: Удалить качество
 *     tags: [Qualities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID качества
 *     responses:
 *       200:
 *         description: Качество удалено
 *       404:
 *         description: Качество не найдено
 */
router.delete('/:id', auth, QualityController.remove);

module.exports = router;
