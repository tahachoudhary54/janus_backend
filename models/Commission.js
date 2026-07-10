const mongoose = require('mongoose');

const commissionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    country: { type: String },
    
    artworkType: { type: String, required: true },
    preferredSize: { type: String },
    budgetRange: { type: String },
    frameRequired: { type: Boolean, default: false },
    preferredDeadline: { type: String },
    
    description: { type: String, required: true },
    
    // Images
    referenceImages: [
      {
        url: { type: String },
        public_id: { type: String },
      }
    ],

    status: {
      type: String,
      enum: ['New', 'Reviewing', 'Quote Sent', 'Accepted', 'In Progress', 'Completed', 'Rejected'],
      default: 'New',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Commission', commissionSchema);
