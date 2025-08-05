const db = require('../models');
const Quality = db.quality;

// Получить все качества
exports.getAll = async (req, res) => {
  try {
    const qualities = await Quality.find();
    res.json(qualities);
  } catch (e) {
    res.status(500).json({ error: 'Ошибка при получении списка качеств' });
  }
};

// Получить одно качество по ID
exports.getById = async (req, res) => {
  try {
    const quality = await Quality.findById(req.params.id);
    if (!quality) return res.status(404).json({ error: 'Качество не найдено' });
    res.json(quality);
  } catch (e) {
    res.status(500).json({ error: 'Ошибка при получении качества' });
  }
};

// Создать новое качество
exports.create = async (req, res) => {
  try {
    const { _id, name, color } = req.body;
    if (!name || !color)
      return res.status(400).json({ error: 'Поля name и color обязательны' });

    const newQuality = await Quality.create({ _id, name, color });
    res.status(201).json(newQuality);
  } catch (e) {
    res.status(500).json({ error: 'Ошибка при создании качества' });
  }
};

// Обновить качество
exports.update = async (req, res) => {
  try {
    const updated = await Quality.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ error: 'Качество не найдено' });
    res.json(updated);
  } catch (e) {
    res.status(500).json({ error: 'Ошибка при обновлении качества' });
  }
};

// Удалить качество
exports.remove = async (req, res) => {
  try {
    const deleted = await Quality.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Качество не найдено' });
    res.json({ message: 'Качество удалено' });
  } catch (e) {
    res.status(500).json({ error: 'Ошибка при удалении качества' });
  }
};
