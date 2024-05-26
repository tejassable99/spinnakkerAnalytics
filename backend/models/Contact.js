
const mongoose = require('mongoose');
const contactSchema = new mongoose.Schema({
  userId: { type: String, ref: 'User', required: true },
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
});
module.exports = mongoose.model('Contact', contactSchema);
