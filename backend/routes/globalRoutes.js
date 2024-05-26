
const express = require('express');
const { getGlobalContacts, markAsSpam } = require('../controllers/globalDatabaseController');
const router = express.Router();

router.get('/contacts', getGlobalContacts);
router.post('/mark-as-spam', markAsSpam);

module.exports = router;
