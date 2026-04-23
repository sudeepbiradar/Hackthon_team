const CATEGORIES = [
  "Police",
  "School/University",
  "Municipality",
  "Consumer/Cyber",
  "Human Rights",
  "Govt Dept",
  "Traffic",
  "Pollution"
];

const KEYWORDS = {
  Police: ["theft", "robbery", "assault", "violence", "harassment", "threat", "missing", "crime"],
  "School/University": ["school", "college", "university", "teacher", "student", "exam", "fees", "hostel"],
  Municipality: ["garbage", "trash", "drain", "sewage", "streetlight", "road", "pothole", "water", "sanitation"],
  "Consumer/Cyber": ["fraud", "scam", "otp", "bank", "upi", "cyber", "hack", "online", "phishing", "refund"],
  "Human Rights": ["discrimination", "abuse", "custody", "rights", "violated", "forced", "child labor"],
  "Govt Dept": ["pension", "ration", "aadhar", "certificate", "subsidy", "office", "bribe", "corruption", "scheme"],
  Traffic: ["traffic", "signal", "parking", "accident", "rash", "helmet", "speed", "wrong side", "congestion"],
  Pollution: ["pollution", "smoke", "noise", "dust", "factory", "waste", "burning", "air quality", "chemical"]
};

function routeCategory(description) {
  const text = String(description || "").toLowerCase();
  let bestCategory = "Municipality";
  let bestScore = 0;

  for (const cat of CATEGORIES) {
    const words = KEYWORDS[cat] || [];
    let score = 0;
    for (const w of words) if (text.includes(String(w).toLowerCase())) score += 1;
    if (score > bestScore) {
      bestScore = score;
      bestCategory = cat;
    }
  }
  return bestCategory;
}

module.exports = { CATEGORIES, routeCategory };
