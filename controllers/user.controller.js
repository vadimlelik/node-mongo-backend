const User = require('../models/User');

exports.getAll = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      profession,
      qualities,
      minAge,
      maxAge,
      sortBy = 'name',
      order = 'asc',
    } = req.query;

    const filter = {};

    if (search) {
      filter.name = { $regex: search, $options: 'i' };
    }

    if (profession) {
      filter.profession = profession;
    }

    if (qualities) {
      const qualitiesArray = qualities.split(',');
      filter.qualities = { $all: qualitiesArray };
    }

    if (minAge || maxAge) {
      filter.age = {};
      if (minAge) filter.age.$gte = parseInt(minAge);
      if (maxAge) filter.age.$lte = parseInt(maxAge);
    }

    const sortOptions = {};
    const allowedSortFields = ['name', 'age'];
    if (allowedSortFields.includes(sortBy)) {
      sortOptions[sortBy] = order === 'desc' ? -1 : 1;
    }

    const users = await User.find(filter)
      .populate('profession qualities')
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await User.countDocuments(filter);

    res.json({
      data: users,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

exports.getById = async (req, res) => {
  const user = await User.findById(req.params.id).populate(
    'profession qualities',
  );
  res.json(user);
};

exports.create = async (req, res) => {
  const newUser = await User.create(req.body);
  res.status(201).json(newUser);
};

exports.update = async (req, res) => {
  const updated = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
};

exports.remove = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
};
