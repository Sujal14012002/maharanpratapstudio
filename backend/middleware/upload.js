const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const videoStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "maharana-pratap-studio/videos",
    resource_type: "video",
    allowed_formats: ["mp4", "mov", "avi", "mkv", "webm"],
  },
});

const uploadVideo = multer({
  storage: videoStorage,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB
  },
});

const photoStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "maharana-pratap-studio/photos",
    resource_type: "image",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const uploadPhoto = multer({
  storage: photoStorage,
  limits: { fileSize: 10 * 1024 * 1024 },
});

const frameStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "maharana-pratap-studio/frames",
    resource_type: "image",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const uploadFrame = multer({
  storage: frameStorage,
  limits: { fileSize: 10 * 1024 * 1024 },
});

module.exports = {
  uploadVideo,
  uploadPhoto,
  uploadFrame,
};