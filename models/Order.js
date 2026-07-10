const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    orderNumber: { type: String, required: true, unique: true },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    artwork: { type: mongoose.Schema.Types.ObjectId, ref: 'Artwork', required: true },
    
    // Purchase Details
    frameOption: { type: String, default: 'No Frame' },
    giftWrap: { type: Boolean, default: false },
    specialInstructions: { type: String },
    
    // Shipping
    shippingAddress: { type: String, required: true },
    country: { type: String, required: true },
    postalCode: { type: String, required: true },
    
    // Financials
    amount: { type: Number, required: true },
    currency: { type: String, default: 'USD' },
    
    // Statuses
    paymentStatus: { type: String, enum: ['Pending', 'Paid', 'Failed'], default: 'Pending' },
    orderStatus: { type: String, enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'], default: 'Pending' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
