const express = require('express');
const router = express.Router();
const { createOrder, getOrders, getOrderById, updateOrderStatus } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getOrders).post(createOrder);
router.route('/:id').get(protect, getOrderById).put(protect, updateOrderStatus);

module.exports = router;
