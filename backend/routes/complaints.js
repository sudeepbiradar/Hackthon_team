const express = require("express");
const multer = require("multer");
const path = require("path");
const Complaint = require("../models/Complaint");
const { routeCategory } = require("../utils/aiRouter");
const { requireAuth, requireRole } = require("../middleware/auth");

const router = express.Router();

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

router.post("/", requireAuth, requireRole("citizen"), upload.single("file"), async (req, res) => {
  try {
    const { title, description, lat, lng } = req.body || {};
    if (!title || !description) return res.status(400).json({ message: "Missing fields" });

    const category = routeCategory(description);
    const attachmentUrl = req.file ? `/uploads/${req.file.filename}` : "";

    const complaint = await Complaint.create({
      citizen: req.user.userId,
      title: String(title).trim(),
      description: String(description).trim(),
      category,
      location: {
        lat: lat === undefined || lat === null || lat === "" ? null : Number(lat),
        lng: lng === undefined || lng === null || lng === "" ? null : Number(lng)
      },
      attachmentUrl
    });

    return res.status(201).json({ complaint });
  } catch {
    return res.status(500).json({ message: "Server error" });
  }
});

router.get("/mine", requireAuth, requireRole("citizen"), async (req, res) => {
  try {
    const complaints = await Complaint.find({ citizen: req.user.userId }).sort({ createdAt: -1 });
    return res.json({ complaints });
  } catch {
    return res.status(500).json({ message: "Server error" });
  }
});

router.post("/:id/comments", requireAuth, async (req, res) => {
  try {
    const { text } = req.body || {};
    if (!text || !String(text).trim()) return res.status(400).json({ message: "Missing comment text" });

    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) return res.status(404).json({ message: "Complaint not found" });

    if (req.user.role === "citizen") {
      if (String(complaint.citizen) !== String(req.user.userId)) {
        return res.status(403).json({ message: "Citizens can only comment on their own complaints" });
      }
    } else if (req.user.role === "authority") {
      if (complaint.category !== req.user.category) {
        return res.status(403).json({ message: "Authority can only comment on complaints in their category" });
      }
    } else {
      return res.status(403).json({ message: "Forbidden" });
    }

    complaint.comments.push({
      text: String(text).trim(),
      authorName: req.user.name || req.user.email || req.user.category || "Anonymous",
      authorRole: req.user.role,
      authorPhotoUrl: ""
    });

    await complaint.save();
    return res.json({ complaint });
  } catch {
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
