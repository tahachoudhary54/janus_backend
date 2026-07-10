const Artwork = require('../models/Artwork');
const { cloudinary } = require('../middleware/uploadMiddleware');

const getArtworks = async (req, res) => {
  try {
    const artworks = await Artwork.find().populate('category');
    res.status(200).json(artworks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getArtworkById = async (req, res) => {
  try {
    const artwork = await Artwork.findById(req.params.id).populate('category');
    if (!artwork) return res.status(404).json({ message: 'Artwork not found' });
    res.status(200).json(artwork);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createArtwork = async (req, res) => {
  try {
    const artwork = await Artwork.create(req.body);
    res.status(201).json(artwork);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateArtwork = async (req, res) => {
  try {
    const artwork = await Artwork.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!artwork) return res.status(404).json({ message: 'Artwork not found' });
    res.status(200).json(artwork);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteArtwork = async (req, res) => {
  try {
    const artwork = await Artwork.findById(req.params.id);
    if (!artwork) return res.status(404).json({ message: 'Artwork not found' });
    
    // Delete main image from cloudinary
    if (artwork.mainImage && artwork.mainImage.public_id) {
      await cloudinary.uploader.destroy(artwork.mainImage.public_id);
    }
    
    // Delete gallery images from cloudinary
    if (artwork.galleryImages && artwork.galleryImages.length > 0) {
      for (const img of artwork.galleryImages) {
        if (img.public_id) {
          await cloudinary.uploader.destroy(img.public_id);
        }
      }
    }

    await artwork.deleteOne();
    res.status(200).json({ message: 'Artwork removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getArtworks, getArtworkById, createArtwork, updateArtwork, deleteArtwork };
