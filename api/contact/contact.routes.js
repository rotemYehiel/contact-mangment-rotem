const express = require('express');
const { getContacts, getContactById, addContact, updateContact, deleteContact, testPlease } = require('./contact.controller');
const router = express.Router();

router.get('/', getContacts);
router.get('/test', testPlease);
router.get('/:id', getContactById);
router.post('/', addContact);
router.put('/:id', updateContact);
router.delete('/:id', deleteContact);

module.exports = router;


