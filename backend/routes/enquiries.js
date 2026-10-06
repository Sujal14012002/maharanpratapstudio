const express = require("express");
const router = express.Router();
const Enquiry = require("../models/Enquiry");

// GET /api/enquiries  (admin listing)
router.get("/", async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status && status !== "All" ? { status } : {};
    const enquiries = await Enquiry.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, data: enquiries });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/enquiries  (public enquiry form)
router.post("/", async (req, res) => {
  try {
    const { name, contactNumber, description } = req.body;
    if (!name || !contactNumber || !description) {
      return res.status(400).json({
        success: false,
        message: "Name, contact number and description are required",
      });
    }
    const enquiry = await Enquiry.create({ name, contactNumber, description });
    res.status(201).json({ success: true, data: enquiry });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT /api/enquiries/:id  (update status)
router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!enquiry) return res.status(404).json({ success: false, message: "Enquiry not found" });
    res.json({ success: true, data: enquiry });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE /api/enquiries/:id
router.delete("/:id", async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);
    if (!enquiry) return res.status(404).json({ success: false, message: "Enquiry not found" });
    res.json({ success: true, message: "Enquiry deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
