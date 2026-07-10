const express = require('express');
const router = express.Router();
const { upload } = require('../middleware/uploadMiddleware');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, upload.array('images', 10), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No images uploaded' });
    }
    
    const uploadedImages = req.files.map(file => ({
      url: file.path,
      public_id: file.filename
    }));

    res.status(200).json(uploadedImages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/', protect, async (req, res) => {
  try {
    const { cloudinary } = require('../middleware/uploadMiddleware');
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'janusgomes/', // the folder name
      max_results: 100
    });
    res.status(200).json(result.resources);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
