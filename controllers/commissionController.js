const Commission = require('../models/Commission');
const { sendEmail } = require('../services/emailService');

// @desc    Create new commission request
// @route   POST /api/commissions
// @access  Public
const createCommission = async (req, res) => {
  try {
    const { 
      name, email, phone, country, 
      artworkType, preferredSize, budgetRange, 
      frameRequired, preferredDeadline, description 
    } = req.body;

    if (!name || !email || !artworkType || !description) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const commission = await Commission.create({
      name, email, phone, country,
      artworkType, preferredSize, budgetRange,
      frameRequired, preferredDeadline, description
    });

    if (commission) {
      // Send Confirmation Email
      const emailHtml = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1A1A1A;">
          <h1 style="font-family: serif; font-size: 24px; font-weight: normal; margin-bottom: 24px;">Commission Request Received.</h1>
          <p>Thank you for reaching out, ${name}. Your commission request for a <strong>${artworkType}</strong> has been received successfully.</p>
          <p>I will personally review your request and get back to you within 24–48 hours to discuss the details and provide an accurate quote.</p>
          <br/>
          <p>Warm regards,</p>
          <p>Janus Gomes</p>
        </div>
      `;
      await sendEmail(email, `Commission Request Received - Janus Gomes`, emailHtml);

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

// @desc    Get all commissions
// @route   GET /api/commissions
// @access  Private (Admin)
const getCommissions = async (req, res) => {
  try {
    const commissions = await Commission.find().sort({ createdAt: -1 });
    res.status(200).json(commissions);
  } catch (error) {
    console.error('Error fetching commissions:', error.message);
    res.status(500).json({ message: 'Server Error: ' + error.message });
  }
};

// @desc    Update commission status
// @route   PUT /api/commissions/:id
// @access  Private (Admin)
const updateCommissionStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const commission = await Commission.findById(req.params.id);

    if (!commission) {
      return res.status(404).json({ message: 'Commission not found' });
    }

    commission.status = status || commission.status;
    const updatedCommission = await commission.save();
    
    res.status(200).json(updatedCommission);
  } catch (error) {
    console.error('Error updating commission:', error.message);
    res.status(500).json({ message: 'Server Error: ' + error.message });
  }
};

module.exports = {
  createCommission,
  getCommissions,
  updateCommissionStatus,
};
