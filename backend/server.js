const fs = require("fs");
const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");

dotenv.config();

const { connectDb } = require("./config/db");
const authRoutes = require("./routes/auth");
const complaintRoutes = require("./routes/complaints");
const authorityRoutes = require("./routes/authority");

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

const uploadsDir = path.join(process.cwd(), process.env.UPLOAD_DIR || "uploads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
app.use("/uploads", express.static(uploadsDir));

app.get("/api/health", (req, res) => res.json({ ok: true, name: "CivicLink" }));
app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/authority", authorityRoutes);

app.use((req, res) => res.status(404).json({ message: "Not found" }));

async function start() {
  await connectDb(process.env.MONGO_URI);
  const port = Number(process.env.PORT || 5000);
  app.listen(port, () => console.log(`CivicLink API running on http://localhost:${port}`));
}

start().catch((err) => {
  console.error("Failed to start server:", err.message);
  process.exit(1);
});
