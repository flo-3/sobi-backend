const express = require('express');
const router = express.Router();

const accountController = require('../controllers/account');

// fund an account with XRP
router.post('/fund-account/', accountController.fundAccount);
// get account info
router.get('/info/:account', accountController.getAccountInfo);

module.exports = router;