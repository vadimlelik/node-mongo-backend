const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Profession = require('../models/Profession');
const Quality = require('../models/Quality');

dotenv.config();

const qualities = {
  tedious: {
    _id: '9906e83f88ea4cbd93108c14',
    name: 'Нудила',
    color: 'primary',
  },
  strange: {
    _id: 'f4a158e393024059988fff66',
    name: 'Странный',
    color: 'secondary',
  },
  buller: { _id: '2c79b6a3fa2e4722bbf7250b', name: 'Троль', color: 'success' },
  alcoholic: {
    _id: '39bb6a1acace4bda9820d8cf',
    name: 'Алкоголик',
    color: 'danger',
  },
  handsome: {
    _id: 'e3dbce15845a4adbb89674a7',
    name: 'Красавчик',
    color: 'info',
  },
  uncertain: {
    _id: 'a0af23fee6d54fc185b74e4a',
    name: 'Неуверенный',
    color: 'dark',
  },
};

const professions = {
  doctor: { _id: '8b21ac3cefbf423ba3e67c77', name: 'Доктор' },
  waiter: { _id: '1e3d7ff56fd742a3897f34de', name: 'Официант' },
  physics: { _id: 'cf18a5099a124a7c8a7013b0', name: 'Физик' },
  cook: { _id: '72df6a4cb7ce40cdb9636a53', name: 'Повар' },
  engineer: { _id: '3e149ee25a2c48959d34b141', name: 'Инженер' },
  actor: { _id: '71e70e84b90c4c519aa5ff1b', name: 'Актер' },
};
const users = [
  {
    _id: 'e6c712b24e80403fbaba3259',
    name: 'Джон Дориан',
    profession: professions.doctor._id,
    qualities: [
      qualities.tedious._id,
      qualities.uncertain._id,
      qualities.strange._id,
    ],
    age: 45,
  },
  {
    _id: '1c19db0b574c4cc3b145c33f',
    name: 'Кокс',
    profession: professions.doctor._id,
    qualities: [
      qualities.buller._id,
      qualities.handsome._id,
      qualities.alcoholic._id,
    ],
    age: 45,
  },
  {
    _id: '5c0dc3121d1549b2b23fa3fc',
    name: 'Боб Келсо',
    profession: professions.doctor._id,
    qualities: [qualities.buller._id],
    age: 44,
  },
  {
    _id: 'f2946b9334b042e9b8d2a1bc',
    name: 'Рэйчел Грин',
    profession: professions.waiter._id,
    qualities: [qualities.uncertain._id],
    age: 35,
  },
  {
    _id: 'a0285c8a1d8c4dc89b357b90',
    name: 'Шелдон Купер',
    profession: professions.physics._id,
    qualities: [qualities.strange._id, qualities.tedious._id],
    age: 24,
  },
  {
    _id: 'bd24b26ae91a4cb0a14f4e44',
    name: 'Леонард Хофстедтер',
    profession: professions.physics._id,
    qualities: [qualities.strange._id, qualities.uncertain._id],
    age: 28,
  },
  {
    _id: 'dfd84fcd5f354d9e85b78a9a',
    name: 'Говард Воловиц',
    profession: professions.engineer._id,
    qualities: [qualities.strange._id, qualities.tedious._id],
    age: 23,
  },
  {
    _id: '1b89ad7f98d24f508bb9d274',
    name: 'Никола Тесла',
    profession: professions.engineer._id,
    qualities: [qualities.handsome._id],
    age: 45,
  },
  {
    _id: '0f14c6b5b0374cd48f63b2d7',
    name: 'Моника Геллер',
    profession: professions.cook._id,
    qualities: [qualities.strange._id, qualities.uncertain._id],
    age: 32,
  },
  {
    _id: '8e18c70d7c6446c2a4de46f4',
    name: 'Рататуй',
    profession: professions.cook._id,
    qualities: [qualities.handsome._id, qualities.buller._id],
    age: 32,
  },
  {
    _id: 'f33b36a5dd4040c5b1ed3d10',
    name: 'Джоуи Триббиани',
    profession: professions.actor._id,
    qualities: [qualities.uncertain._id, qualities.strange._id],
    age: 22,
  },
  {
    _id: '4b63f2c77214401cb0e16369',
    name: 'Брэд Питт',
    profession: professions.actor._id,
    qualities: [qualities.handsome._id],
    age: 45,
  },
];

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  await User.deleteMany();
  await Profession.deleteMany();
  await Quality.deleteMany();

  await Quality.insertMany(Object.values(qualities));
  await Profession.insertMany(Object.values(professions));
  await User.insertMany(users);

  console.log('Database seeded!');
  process.exit();
};

seed();
