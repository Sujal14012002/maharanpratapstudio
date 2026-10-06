const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Photo = require("../models/Photo");

const router = express.Router();

// ======================================================
// CREATE UPLOADS FOLDER
// ======================================================

const uploadDir = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ======================================================
// MULTER STORAGE
// ======================================================

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },

  filename: function (req, file, cb) {
    const uniqueName =
      Date.now() + "-" + file.originalname.replace(/\s+/g, "-");

    cb(null, uniqueName);
  },
});

// ======================================================
// FILE FILTER
// ======================================================

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

// ======================================================
// MULTER
// ======================================================

const uploadPhoto = multer({
  storage: storage,

  limits: {
    fileSize: 5 * 1024 * 1024,
  },

  fileFilter: fileFilter,
});

// ======================================================
// CREATE PHOTO
// POST /api/photos
// ======================================================

router.post("/", uploadPhoto.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded",
      });
    }

    const { title, category } = req.body;

    if (!title || !category) {
      return res.status(400).json({
        success: false,
        message: "Title and category are required",
      });
    }

    const imageUrl = `/uploads/${req.file.filename}`;

    const photo = await Photo.create({
      title,
      category,
      imageUrl,
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size,
      mimetype: req.file.mimetype,
    });

    res.status(201).json({
      success: true,
      message: "Photo uploaded successfully",
      data: photo,
    });
  } catch (error) {
    console.error("Photo upload error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while uploading image",
      error: error.message,
    });
  }
});

// ======================================================
// GET ALL PHOTOS
// GET /api/photos
// ======================================================

router.get("/", async (req, res) => {
  try {
    const { category } = req.query;

    let filter = {};

    if (category && category !== "All") {
      filter.category = category;
    }

    const photos = await Photo.find(filter).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      data: photos,
    });
  } catch (error) {
    console.error("Get photos error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while getting photos",
      error: error.message,
    });
  }
});

// ======================================================
// GET PHOTO CATEGORIES
// GET /api/photos/categories
// ======================================================

router.get("/categories", async (req, res) => {
  try {
    const categories = await Photo.distinct("category");

    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error("Get categories error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while getting categories",
    });
  }
});

// ======================================================
// DELETE PHOTO
// DELETE /api/photos/:id
// ======================================================

router.delete("/:id", async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);

    if (!photo) {
      return res.status(404).json({
        success: false,
        message: "Photo not found",
      });
    }

    // Delete image from uploads folder
    const filePath = path.join(
      uploadDir,
      photo.filename
    );

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Delete from MongoDB
    await Photo.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Photo deleted successfully",
    });
  } catch (error) {
    console.error("Delete photo error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while deleting photo",
    });
  }
});

module.exports = router;