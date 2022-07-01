const express = require('express');
const router = express.Router();
const contactSchema = require('../controllers/contactController');

router.get('/',contactSchema.getAllContact)
router.get('/user/:id',contactSchema.getContactFromUser)

router.post('/',contactSchema.addContact)

module.exports = router