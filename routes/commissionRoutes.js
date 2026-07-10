const express = require('express');
const router = express.Router();
const { 
  createCommission, 
  getCommissions, 
  updateCommissionStatus 
} = require('../controllers/commissionController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(createCommission).get(protect, getCommissions);
router.route('/:id').put(protect, updateCommissionStatus);

module.exports = router;
