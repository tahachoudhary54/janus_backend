const Commission = require('../models/Commission');

// @desc    Create new commission request
// @route   POST /api/commissions
// @access  Public
const createCommission = async (req, res) => {
  try {
    const { name, email, packageType, size, description } = req.body;

    if (!name || !email || !packageType || !description) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const commission = await Commission.create({
      name,
      email,
      packageType,
      size,
      description,
    });

    if (commission) {
      res.status(201).json({
        message: 'Commission request submitted successfully',
        data: commission,
      });
    } else {
      res.status(400).json({ message: 'Invalid commission data' });
    }
  } catch (error) {
    console.error('Error creating commission:', error.message);
    res.status(500).json({ message: 'Server Error: ' + error.message });
  }
};

module.exports = {
  createCommission,
};
