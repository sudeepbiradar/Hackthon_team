const mongoose = require("mongoose");

const timelineItemSchema = new mongoose.Schema(
  {
    stage: { type: String, required: true },
    note: { type: String, default: "" },
    at: { type: Date, default: Date.now }
  },
  { _id: false }
);

const commentSchema = new mongoose.Schema(
  {
    authorName: { type: String, required: true, trim: true },
    authorRole: { type: String, required: true, trim: true },
    authorPhotoUrl: { type: String, default: "" },
    text: { type: String, required: true, trim: true },
    at: { type: Date, default: Date.now }
  },
  { _id: false }
);

const complaintSchema = new mongoose.Schema(
  {
    citizen: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: [
        "Police",
        "School/University",
        "Municipality",
        "Consumer/Cyber",
        "Human Rights",
        "Govt Dept",
        "Traffic",
        "Pollution"
      ],
      required: true,
      index: true
    },
    location: {
      lat: { type: Number, default: null },
      lng: { type: Number, default: null }
    },
    attachmentUrl: { type: String, default: "" },
    evidenceUrl: { type: String, default: "" },
    currentStage: { type: String, required: true, default: "Submitted", index: true },
    timeline: { type: [timelineItemSchema], default: () => [{ stage: "Submitted", note: "Complaint filed" }] },
    comments: { type: [commentSchema], default: [] }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Complaint", complaintSchema);
