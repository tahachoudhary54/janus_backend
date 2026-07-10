const Order = require('../models/Order');
const Customer = require('../models/Customer');
const Artwork = require('../models/Artwork');
const { sendEmail } = require('../services/emailService');

// Generate unique order number (e.g. JG-20260710-ABCD)
const generateOrderNumber = () => {
  const date = new Date().toISOString().split('T')[0].replace(/-/g, '');
  const randomStr = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `JG-${date}-${randomStr}`;
};

const createOrder = async (req, res) => {
  try {
    const { 
      customer: customerData, 
      artworkId, 
      frameOption, 
      giftWrap, 
      specialInstructions, 
      amount 
    } = req.body;

    // 1. Verify Artwork is available
    const artwork = await Artwork.findById(artworkId);
    if (!artwork || artwork.availability !== 'Available') {
      return res.status(400).json({ message: 'Artwork is not available for purchase.' });
    }

    // 2. Find or Create Customer
    let customer = await Customer.findOne({ email: customerData.email });
    if (!customer) {
      customer = await Customer.create({
        name: customerData.name,
        email: customerData.email,
        phone: customerData.phone,
        country: customerData.country,
        shippingAddress: customerData.shippingAddress,
        postalCode: customerData.postalCode,
        totalPurchases: 1
      });
    } else {
      customer.totalPurchases += 1;
      await customer.save();
    }

    // 3. Create Order
    const orderNumber = generateOrderNumber();
    const order = await Order.create({
      orderNumber,
      customer: customer._id,
      artwork: artwork._id,
      frameOption,
      giftWrap,
      specialInstructions,
      shippingAddress: customerData.shippingAddress,
      country: customerData.country,
      postalCode: customerData.postalCode,
      amount,
      paymentStatus: 'Paid', // MOCK payment success as requested
      orderStatus: 'Processing'
    });

    // 4. Mark Artwork as Sold
    artwork.availability = 'Sold';
    await artwork.save();

    // 5. Send Confirmation Email
    const emailHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1A1A1A;">
        <h1 style="font-family: serif; font-size: 24px; font-weight: normal; margin-bottom: 24px;">Thank you for your order, ${customer.name}.</h1>
        <p>Your order for <strong>${artwork.title}</strong> has been received and is being prepared.</p>
        <p><strong>Order Number:</strong> ${orderNumber}</p>
        <p><strong>Total Amount:</strong> $${amount}</p>
        <p><strong>Shipping To:</strong> ${customerData.shippingAddress}</p>
        <br/>
        <p>Janus Gomes</p>
      </div>
    `;
    await sendEmail(customer.email, `Order Confirmation - ${orderNumber}`, emailHtml);

    // 6. Populate and Return
    const populatedOrder = await Order.findById(order._id)
      .populate('customer')
      .populate('artwork');

    res.status(201).json(populatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('customer')
      .populate('artwork')
      .sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('customer')
      .populate('artwork');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus, paymentStatus } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    if (orderStatus) order.orderStatus = orderStatus;
    if (paymentStatus) order.paymentStatus = paymentStatus;

    await order.save();
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createOrder, getOrders, getOrderById, updateOrderStatus };
