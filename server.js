const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

require('./utils/startUp')();
const app = express();

dotenv.config();
var corsOptions = {
  origin: 'http://localhost:5173'
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

require('./swagger')(app);

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/qualities', require('./routes/quality.routes'));
app.use('/api/professions', require('./routes/profession.routes'));
// Comments routes mounted at /api to expose /api/users/:userId/comments and /api/comments/:id
app.use('/api', require('./routes/comment.routes'));

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
