const Profession = require('../models/Profession');

// Получить все профессии
exports.getAll = async (req, res) => {
  try {
    const professions = await Profession.find();
    res.json(professions);
  } catch (e) {
    res.status(500).json({ error: 'Ошибка при получении списка профессий' });
  }
};

// Получить одну профессию по ID
exports.getById = async (req, res) => {
  try {
    const profession = await Profession.findById(req.params.id);
    if (!profession)
      return res.status(404).json({ error: 'Профессия не найдена' });
    res.json(profession);
  } catch (e) {
    res.status(500).json({ error: 'Ошибка при получении профессии' });
  }
};

// Создать новую профессию
exports.create = async (req, res) => {
  try {
    const { _id, name } = req.body;
    if (!name) return res.status(400).json({ error: 'Поле name обязательно' });

    const newProfession = await Profession.create({ _id, name });
    res.status(201).json(newProfession);
  } catch (e) {
    res.status(500).json({ error: 'Ошибка при создании профессии' });
  }
};

// Обновить профессию по ID
exports.update = async (req, res) => {
  try {
    const updated = await Profession.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!updated)
      return res.status(404).json({ error: 'Профессия не найдена' });
    res.json(updated);
  } catch (e) {
    res.status(500).json({ error: 'Ошибка при обновлении профессии' });
  }
};

// Удалить профессию по ID
exports.remove = async (req, res) => {
  try {
    const deleted = await Profession.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ error: 'Профессия не найдена' });
    res.json({ message: 'Профессия удалена' });
  } catch (e) {
    res.status(500).json({ error: 'Ошибка при удалении профессии' });
  }
};
