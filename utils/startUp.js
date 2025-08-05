const mongoose = require('mongoose');
const debug = require('debug')('server:db');
const chalk = require('chalk');
const models = require('../models');
const bcrypt = require('bcryptjs');

const professionsMock = require('../mockData/profession.json');
const qualitiesMock = require('../mockData/qualities.json');
const usersMock = require('../mockData/users.json');

// Создаём сущности (профессии, качества) из моков, если их нет в базе
const generateSimpleEntity = async (data, model) => {
  return Promise.all(
    data.map(async (item) => {
      // ищем по уникальному полю, например name
      const existing = await model.findOne({ name: item.name });
      if (!existing) {
        const dataToSave = { ...item };
        delete dataToSave._id; // Убираем _id из моков, чтобы Mongoose сгенерировал сам
        const newItem = new model(dataToSave);
        await newItem.save();
        return newItem;
      }
      return existing;
    }),
  );
};

const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// При создании пользователя подставляем валидные _id из базы, а не строки из моков
async function setInitialData() {
  // 1. Профессии
  const professionsData = await generateSimpleEntity(
    professionsMock,
    models.profession,
  );
  if (professionsData) {
    debug(`Professions in DB ${chalk.green('✓')}`);
  } else {
    debug(`Professions error ${chalk.red('x')}`);
  }

  // 2. Качества
  const qualitiesData = await generateSimpleEntity(
    qualitiesMock,
    models.quality,
  );
  if (qualitiesData) {
    debug(`Qualities in DB ${chalk.green('✓')}`);
  } else {
    debug(`Qualities error ${chalk.red('x')}`);
  }

  // 3. Пользователи
  const users = await Promise.all(
    usersMock.map(async (userData) => {
      try {
        const existingUser = await models.user.findOne({
          email: userData.email,
        });
        if (existingUser) return existingUser;

        delete userData._id;

        // Заменяем profession из моков на реальный _id из базы (случайный)
        userData.profession = getRandomItem(professionsData)._id;

        // Заменяем качества из моков на реальные _id из базы (случайные 2-3)
        const shuffledQualities = qualitiesData.sort(() => 0.5 - Math.random());
        userData.qualities = shuffledQualities.slice(0, 3).map((q) => q._id);

        const salt = await bcrypt.genSalt(5);
        userData.password = await bcrypt.hash(userData.password, salt);

        const newUser = new models.user(userData);
        await newUser.save();
        return newUser;
      } catch (error) {
        debug(`Error creating user: ${error.message}`);
        return null;
      }
    }),
  );

  if (users) {
    debug(`Users in DB ${chalk.green('✓')}`);
  } else {
    debug(`Users error ${chalk.red('x')}`);
  }
}

module.exports = function () {
  mongoose.connect('mongodb://mongo:27017/testdb');
  const db = mongoose.connection;
  db.on(
    'error',
    console.error.bind(console, `${chalk.red('x')} connection error:`),
  );
  db.once('open', function () {
    debug(`MongoDB status: Connected ${chalk.green('✓')}`);
    setInitialData();
  });
};
