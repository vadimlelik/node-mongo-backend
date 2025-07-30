const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const { auth, adminOnly } = require('../middleware/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Управление пользователями
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Получить список пользователей с фильтрацией, пагинацией и сортировкой
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Номер страницы
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Кол-во элементов на странице
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Поиск по имени пользователя
 *       - in: query
 *         name: profession
 *         schema:
 *           type: string
 *         description: ID профессии для фильтрации
 *       - in: query
 *         name: qualities
 *         schema:
 *           type: string
 *         description: Список ID качеств через запятую
 *       - in: query
 *         name: minAge
 *         schema:
 *           type: integer
 *         description: Минимальный возраст
 *       - in: query
 *         name: maxAge
 *         schema:
 *           type: integer
 *         description: Максимальный возраст
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [name, age]
 *           default: name
 *         description: Поле для сортировки
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: asc
 *         description: Направление сортировки
 *     responses:
 *       200:
 *         description: Список пользователей с пагинацией
 */
router.get('/', UserController.getAll);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Получить пользователя по ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID пользователя
 *     responses:
 *       200:
 *         description: Пользователь найден
 *       404:
 *         description: Пользователь не найден
 */
router.get('/:id', auth, UserController.getById);

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Создать нового пользователя
 *     tags: [Users]
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
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               age:
 *                 type: integer
 *               profession:
 *                 type: string
 *               qualities:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Пользователь успешно создан
 *       400:
 *         description: Ошибка валидации данных
 */
router.post('/', auth, UserController.create);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Обновить данные пользователя
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID пользователя
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               age:
 *                 type: integer
 *               profession:
 *                 type: string
 *               qualities:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Пользователь обновлён
 *       400:
 *         description: Ошибка валидации
 *       404:
 *         description: Пользователь не найден
 */
router.put('/:id', auth, UserController.update);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Удалить пользователя
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID пользователя
 *     responses:
 *       200:
 *         description: Пользователь удалён
 *       404:
 *         description: Пользователь не найден
 */
router.delete('/:id', auth, UserController.remove);

module.exports = router;
