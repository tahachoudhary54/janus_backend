const express = require('express');
const router = express.Router();
const { getArtworks, getArtworkById, createArtwork, updateArtwork, deleteArtwork } = require('../controllers/artworkController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getArtworks).post(protect, createArtwork);
router.route('/:id').get(getArtworkById).put(protect, updateArtwork).delete(protect, deleteArtwork);

module.exports = router;
