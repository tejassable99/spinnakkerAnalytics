
const express = require('express');
const { addContact, getContacts } = require('../controllers/contactController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, addContact);
router.post('/getContacts', authMiddleware, getContacts);

module.exports = router;