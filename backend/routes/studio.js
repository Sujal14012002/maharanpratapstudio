const express = require("express");
const router = express.Router();
const cloudinary = require("../config/cloudinary");
const StudioInfo = require("../models/StudioInfo");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: async () => ({
    folder: "maharana-pratap-studio/branding",
    resource_type: "image",
  }),
});
const uploadBranding = multer({ storage });

// GET /api/studio  -> returns the single settings doc, creating a default one if absent
router.get("/", async (req, res) => {
  try {
    let info = await StudioInfo.findOne();
    if (!info) {
      info = await StudioInfo.create({});
    }
    res.json({ success: true, data: info });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT /api/studio  -> update text fields
router.put("/", async (req, res) => {
  try {
    let info = await StudioInfo.findOne();
    if (!info) info = new StudioInfo();
    Object.assign(info, req.body);
    await info.save();
    res.json({ success: true, data: info });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT /api/studio/logo  -> upload/replace logo image
router.put("/logo", uploadBranding.single("logo"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: "Logo file is required" });
    let info = await StudioInfo.findOne();
    if (!info) info = new StudioInfo();
    if (info.logoCloudinaryId) await cloudinary.uploader.destroy(info.logoCloudinaryId).catch(() => {});
    info.logoUrl = req.file.path;
    info.logoCloudinaryId = req.file.filename;
    await info.save();
    res.json({ success: true, data: info });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT /api/studio/hero-image
router.put("/hero-image", uploadBranding.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: "Image file is required" });
    let info = await StudioInfo.findOne();
    if (!info) info = new StudioInfo();
    if (info.heroCloudinaryId) await cloudinary.uploader.destroy(info.heroCloudinaryId).catch(() => {});
    info.heroImageUrl = req.file.path;
    info.heroCloudinaryId = req.file.filename;
    await info.save();
    res.json({ success: true, data: info });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT /api/studio/about-image
router.put("/about-image", uploadBranding.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: "Image file is required" });
    let info = await StudioInfo.findOne();
    if (!info) info = new StudioInfo();
    if (info.aboutCloudinaryId) await cloudinary.uploader.destroy(info.aboutCloudinaryId).catch(() => {});
    info.aboutImageUrl = req.file.path;
    info.aboutCloudinaryId = req.file.filename;
    await info.save();
    res.json({ success: true, data: info });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
