const express = require('express');
const router = express.Router();
const { getSettings, getSettingByType, updateSetting } = require('../controllers/settingController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getSettings).post(protect, updateSetting);
router.route('/:type').get(getSettingByType);

module.exports = router;
