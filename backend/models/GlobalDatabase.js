
const mongoose = require('mongoose');

const globalDatabaseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true },
  spamMarkedBy: [{ type: String, ref: 'User' }],
  
});

globalDatabaseSchema.virtual('spamLikelihood').get(function () {
  return this.spamMarkedBy.length;
});

module.exports = mongoose.model('GlobalDatabase', globalDatabaseSchema);
