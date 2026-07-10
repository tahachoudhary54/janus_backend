const mongoose = require('mongoose');

const artworkSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    shortDescription: { type: String },
    fullDescription: { type: String },
    story: { type: String },
    materials: { type: String },
    
    // Images
    mainImage: {
      url: { type: String, required: true },
      public_id: { type: String, required: true },
    },
    galleryImages: [
      {
        url: { type: String },
        public_id: { type: String },
      }
    ],

    // Technical Details
    width: { type: Number },
    height: { type: Number },
    unit: { type: String, enum: ['cm', 'inches'], default: 'inches' },
    orientation: { type: String, enum: ['Portrait', 'Landscape', 'Square'], default: 'Portrait' },
    medium: { type: String },
    yearCreated: { type: String },

    // Pricing
    originalPrice: { type: Number },
    framedPrice: { type: Number },
    currency: { type: String, default: 'USD' },

    // Availability
    availability: {
      type: String,
      enum: ['Available', 'Sold', 'Commission Only', 'Reserved'],
      default: 'Available'
    },

    // Options
    isFeatured: { type: Boolean, default: false },
    showOnHomepage: { type: Boolean, default: true },
    allowCommissionSimilar: { type: Boolean, default: true },

    // SEO
    metaTitle: { type: String },
    metaDescription: { type: String },

    // Status
    status: { type: String, enum: ['Draft', 'Published'], default: 'Published' },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Artwork', artworkSchema);
