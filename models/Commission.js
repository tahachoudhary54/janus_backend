const mongoose = require('mongoose');

const commissionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    packageType: {
      type: String,
      required: [true, 'Please select a package type'],
      enum: ['Custom Portraits', 'Pet & Wildlife', 'Botanical & Nature', 'Other'],
    },
    size: {
      type: String,
      default: 'Not sure yet',
    },
    description: {
      type: String,
      required: [true, 'Please add a description of your request'],
    },
    status: {
      type: String,
      enum: ['Pending', 'Reviewed', 'Accepted', 'Completed', 'Declined'],
      default: 'Pending',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Commission', commissionSchema);
