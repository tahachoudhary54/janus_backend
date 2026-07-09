const express = require('express');
const router = express.Router();
const { createCommission } = require('../controllers/commissionController');

router.route('/').post(createCommission);

module.exports = router;
