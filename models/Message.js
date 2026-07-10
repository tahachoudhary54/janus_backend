const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String },
    content: { type: String, required: true },
    status: {
      type: String,
      enum: ['Unread', 'Read', 'Archived'],
      default: 'Unread',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Message', messageSchema);
