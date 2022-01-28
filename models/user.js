let mongoose = require('mongoose');

let usersSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  journeys: [{ type: mongoose.Schema.Types.ObjectId, ref: 'journey' }]
});

let usersModel = mongoose.model('users', usersSchema);

module.exports = usersModel;