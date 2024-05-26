
const User = require('../models/User');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const shortid = require('shortid');

const register = async (req, res) => {
  const { name, phoneNumber, email, city, country } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }
    const userId = shortid.generate();


    user = new User({
      name,
      phoneNumber,
      email,
      city,
      country,
      userId
    });

    const savedUser = await user.save();
    res.status(201).json({ msg: 'User registered successfully', user: savedUser });
  } catch (error) {
    console.error('Error verifying OTP:', error.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

const generateOTP = () => {
    return crypto.randomBytes(3).toString('hex'); // Generates a 6-digit OTP
  };
  
  const sendOTP = async (req, res) => {
    const { email } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: 'User not found' });
      }
  
      const otp = generateOTP();
      user.otp = otp;
      user.otpExpiry = Date.now() + 3600000; // 1 hour expiry
      await user.save();
  
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: { user: process.env.EMAIL, pass: process.env.PASSWORD },
      });
  
      const mailOptions = {
        from: process.env.EMAIL,
        to: user.email,
        subject: 'Login OTP',
        text: `Your OTP for login is: ${otp}`,
      };
  
      transporter.sendMail(mailOptions, (err, response) => {
        if (err) return res.status(500).send({ msg: err.message });
        res.status(200).send('OTP has been sent to your email.');
      });
    } catch (error) {
      res.status(500).json({ msg: 'Server error' });
    }
  };
  
  const verifyOTP = async (req, res) => {
    const { email, otp } = req.body;
    
  
    try {
      const user = await User.findOne({ email, otp, otpExpiry: { $gt: Date.now() } });
      console.log(user+"gfffffffffffffffff")
      if (!user) {
        return res.status(400).json({ msg: 'Invalid OTP or OTP expired' });
      }
  
      const payload = { user: { id: user.id } };
      
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
     
      res.status(200).json({ token, userId: user.userId });
    } catch (error) {
      res.status(500).json({ msg: 'Server error' });
    }
  };
  
  module.exports = { register, sendOTP, verifyOTP };


