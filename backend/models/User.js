
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  city: { type: String },
  country: { type: String },
  isVerified: { type: Boolean, default: false },
  otp: { type: String },
  otpExpiry: { type: Date },
  userId:{type:String},
  contacts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Contact' }],
});

module.exports = mongoose.model('User', userSchema);
