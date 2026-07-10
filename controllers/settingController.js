const Setting = require('../models/Setting');

const getSettings = async (req, res) => {
  try {
    const settings = await Setting.find();
    res.status(200).json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSettingByType = async (req, res) => {
  try {
    const setting = await Setting.findOne({ type: req.params.type });
    if (!setting) return res.status(404).json({ message: 'Setting not found' });
    res.status(200).json(setting);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateSetting = async (req, res) => {
  try {
    const { type, data } = req.body;
    let setting = await Setting.findOne({ type });

    if (setting) {
      setting.data = data;
      setting = await setting.save();
    } else {
      setting = await Setting.create({ type, data });
    }

    res.status(200).json(setting);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getSettings, getSettingByType, updateSetting };
