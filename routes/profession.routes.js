const express = require('express');
const router = express.Router();
const ProfessionController = require('../controllers/profession.controller');
const { auth, adminOnly } = require('../middleware/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: Professions
 *   description: Управление профессиями
 */

/**
 * @swagger
 * /api/professions:
 *   get:
 *     summary: Получить список профессий
 *     tags: [Professions]
 *     responses:
 *       200:
 *         description: Список профессий
 */
router.get('/', auth, ProfessionController.getAll);

/**
 * @swagger
 * /api/professions/{id}:
 *   get:
 *     summary: Получить профессию по ID
 *     tags: [Professions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID профессии
 *     responses:
 *       200:
 *         description: Профессия найдена
 *       404:
 *         description: Профессия не найдена
 */
router.get('/:id', auth, ProfessionController.getById);

/**
 * @swagger
 * /api/professions:
 *   post:
 *     summary: Создать профессию
 *     tags: [Professions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Профессия создана
 *       400:
 *         description: Ошибка валидации
 */
router.post('/', auth, ProfessionController.create);

/**
 * @swagger
 * /api/professions/{id}:
 *   put:
 *     summary: Обновить профессию
 *     tags: [Professions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID профессии
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Профессия обновлена
 *       400:
 *         description: Ошибка валидации
 *       404:
 *         description: Профессия не найдена
 */
router.put('/:id', auth, ProfessionController.update);

/**
 * @swagger
 * /api/professions/{id}:
 *   delete:
 *     summary: Удалить профессию
 *     tags: [Professions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID профессии
 *     responses:
 *       200:
 *         description: Профессия удалена
 *       404:
 *         description: Профессия не найдена
 */
router.delete('/:id', auth, ProfessionController.remove);

module.exports = router;
