const express = require("express");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const Complaint = require("../models/Complaint");
const { requireAuth, requireRole } = require("../middleware/auth");
const { CATEGORIES } = require("../utils/aiRouter");

function uploadsDir() {
  const base = process.env.UPLOAD_DIR || "uploads";
  return path.join(process.cwd(), base);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir()),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname || "");
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/bmp',
    'image/tiff',
    'image/svg+xml'
  ];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only image files are allowed.'), false);
  }
};

const upload = multer({ 
  storage, 
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } 
});

const router = express.Router();

function parseCodes() {
  try {
    return JSON.parse(process.env.AUTHORITY_CODES_JSON || "{}");
  } catch {
    return {};
  }
}

router.post("/login", async (req, res) => {
  const { category, secretCode } = req.body || {};
  if (!category || !secretCode) return res.status(400).json({ message: "Missing fields" });
  if (!CATEGORIES.includes(String(category))) return res.status(400).json({ message: "Invalid category" });

  const expected = parseCodes()[String(category)];
  if (!expected || String(secretCode) !== String(expected)) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ role: "authority", category: String(category) }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d"
  });
  return res.json({ token, authority: { category: String(category) } });
});

router.get("/complaints", requireAuth, requireRole("authority"), async (req, res) => {
  try {
    const complaints = await Complaint.find({ category: req.user.category })
      .populate("citizen", "name email")
      .sort({ createdAt: -1 });
    return res.json({ complaints });
  } catch {
    return res.status(500).json({ message: "Server error" });
  }
});

router.patch("/complaints/:id/stage", requireAuth, requireRole("authority"), async (req, res) => {
  try {
    const { stage, note } = req.body || {};
    if (!stage) return res.status(400).json({ message: "Missing stage" });

    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) return res.status(404).json({ message: "Not found" });
    if (complaint.category !== req.user.category) return res.status(403).json({ message: "Forbidden" });

    complaint.currentStage = String(stage);
    complaint.timeline.push({ stage: String(stage), note: String(note || "") });
    await complaint.save();
    return res.json({ complaint });
  } catch {
    return res.status(500).json({ message: "Server error" });
  }
});

router.patch("/complaints/:id/evidence", requireAuth, requireRole("authority"), upload.single("evidence"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "Missing evidence file" });

    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) return res.status(404).json({ message: "Not found" });
    if (complaint.category !== req.user.category) return res.status(403).json({ message: "Forbidden" });

    complaint.evidenceUrl = `/uploads/${req.file.filename}`;
    complaint.timeline.push({ stage: complaint.currentStage, note: "Evidence uploaded by authority" });
    await complaint.save();
    return res.json({ complaint });
  } catch {
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
