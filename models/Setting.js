const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema(
  {
    type: { type: String, required: true, unique: true }, // e.g., 'artist_info', 'website_content', 'seo'
    data: { type: mongoose.Schema.Types.Mixed, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Setting', settingSchema);
