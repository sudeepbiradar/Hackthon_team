import { useEffect, useMemo, useRef, useState } from "react";
import { api } from "./api";

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

const STAGES = ["Submitted", "In Review", "Assigned", "In Progress", "Resolved"];

// Attachment Photo Modal with zoom & download
function AttachmentModal({ open, url, onClose }) {
  const [scale, setScale] = useState(1);
  const [imageError, setImageError] = useState(false);

  if (!open || !url) return null;

  function downloadImage() {
    const link = document.createElement("a");
    link.href = url;
    link.download = `civiclink-image-${Date.now()}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 p-4 backdrop-blur-md" onClick={onClose}>
      <div className="w-full max-w-5xl animate-fadeInUp" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="text-lg font-semibold text-slate-100">Image View</div>
          <div className="flex items-center gap-2">
            <button
              className="btn text-xs"
              type="button"
              onClick={() => setScale(Math.max(1, scale - 0.2))}
              disabled={scale <= 1}
            >
              🔍 -
            </button>
            <div className="text-xs text-slate-400 min-w-12 text-center">{Math.round(scale * 100)}%</div>
            <button
              className="btn text-xs"
              type="button"
              onClick={() => setScale(scale + 0.2)}
              disabled={scale >= 2.5}
            >
              🔍 +
            </button>
            <button
              className="btn btn-citizen text-xs"
              type="button"
              onClick={downloadImage}
            >
              Download Image
            </button>
            <button
              className="btn text-xs"
              type="button"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
        <div className="overflow-auto rounded-2xl border border-cyan-400/30 bg-black/50 max-h-[75vh] flex items-center justify-center">
          {imageError ? (
            <div className="p-8 text-center text-slate-400">
              <div className="text-lg mb-2">Unable to load image</div>
              <div className="text-sm">The image format may not be supported or the file is corrupted</div>
            </div>
          ) : (
            <img
              src={url}
              alt="Full image view"
              className="object-contain transition-transform duration-200"
              style={{ transform: `scale(${scale})` }}
              onError={() => setImageError(true)}
              onLoad={() => setImageError(false)}
            />
          )}
        </div>
        <div className="mt-3 text-xs text-slate-400 text-center">Click outside or press Close to exit • Use zoom buttons to adjust view • Download to save image</div>
      </div>
    </div>
  );
}

// Clean Landing Page with meaningful animations
function LandingPage({ onSelectRole }) {
  const [hoverCitizen, setHoverCitizen] = useState(false);
  const [hoverAuthority, setHoverAuthority] = useState(false);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
      </div>

      {/* Hero Section */}
      <div className="relative z-10 text-center max-w-5xl mx-auto">
        <div className="mb-8">
          <div className="inline-block mb-6 px-4 py-2 rounded-full border border-cyan-400/30 bg-cyan-500/5 text-cyan-200 text-xs font-semibold uppercase tracking-wider">
            Making Civic Engagement Simple
          </div>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent animate-pulse">
            CivicLink
          </h1>
          <p className="text-2xl md:text-3xl text-slate-100 mb-4 font-semibold">
            Bridge the Gap Between Citizens and Authorities
          </p>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Empower your voice. File complaints instantly, track progress in real-time, and see accountability happen. A transparent platform for meaningful civic engagement.
          </p>
        </div>

        {/* Animated Connection */}
        <div className="my-16 flex items-center justify-center gap-6 animate-fadeIn">
          <div className="text-5xl animate-bounce" style={{ animationDelay: "0s" }}>Citizen</div>
          <div className="text-4xl text-cyan-400 animate-pulse">Connects</div>
          <div className="text-5xl animate-bounce" style={{ animationDelay: "0.1s" }}>Authority</div>
        </div>

        {/* Role Selection Cards with Enhanced Design */}
        <div className="grid md:grid-cols-2 gap-8 mt-12 max-w-5xl mx-auto mb-12">
          {/* Citizen Card */}
          <div
            className="relative group cursor-pointer"
            onClick={() => onSelectRole("citizen")}
            onMouseEnter={() => setHoverCitizen(true)}
            onMouseLeave={() => setHoverCitizen(false)}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-cyan-400 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-300" />
            <div className="relative glass-citizen rounded-2xl p-8 card-hover border-2 border-cyan-400/40 hover:border-cyan-400/70 transition-all">
              <div className="text-6xl mb-6 animate-bounce">Citizens</div>
              <h2 className="text-2xl font-bold text-cyan-300 mb-4">Citizen</h2>
              <ul className="text-slate-300 mb-6 text-sm space-y-2 text-left">
                <li>File complaints with photos</li>
                <li>Track progress in real-time</li>
                <li>See authority responses</li>
                <li>Share your voice</li>
              </ul>
              <button className="btn-citizen w-full py-4 rounded-lg font-semibold text-lg hover:scale-105 transition-transform">
                Get Started
              </button>
            </div>
          </div>

          {/* Authority Card */}
          <div
            className="relative group cursor-pointer"
            onClick={() => onSelectRole("authority")}
            onMouseEnter={() => setHoverAuthority(true)}
            onMouseLeave={() => setHoverAuthority(false)}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-300" />
            <div className="relative glass-authority rounded-2xl p-8 card-hover border-2 border-purple-400/40 hover:border-purple-400/70 transition-all animate-authorityGlow">
              <div className="text-6xl mb-6 animate-bounce" style={{ animationDelay: "0.15s" }}>Authorities</div>
              <h2 className="text-2xl font-bold text-purple-300 mb-4">Authority</h2>
              <ul className="text-slate-300 mb-6 text-sm space-y-2 text-left">
                <li>Manage complaints efficiently</li>
                <li>Upload work evidence</li>
                <li>Track resolution progress</li>
                <li>Show transparency</li>
              </ul>
              <button className="btn-authority w-full py-4 rounded-lg font-semibold text-lg hover:scale-105 transition-transform">
                Access Dashboard
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Features Section */}
        <div className="mt-16 w-full">
          <h3 className="text-xl font-semibold text-slate-100 mb-8">Why CivicLink?</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { icon: "Lightning", title: "Fast", desc: "Instant filing" },
              { icon: "Target", title: "Smart", desc: "AI routing" },
              { icon: "Chart", title: "Track", desc: "Real-time updates" },
              { icon: "Shield", title: "Secure", desc: "Data protected" }
            ].map((feature, idx) => (
              <div key={idx} className="glass rounded-2xl p-6 card-hover hover:bg-white/10 transition-all">
                <div className="text-4xl mb-3">{feature.icon}</div>
                <p className="font-semibold text-slate-100 text-sm mb-1">{feature.title}</p>
                <p className="text-xs text-slate-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Stats */}
        <div className="mt-16 grid grid-cols-3 gap-6 max-w-2xl mx-auto text-center">
          <div>
            <div className="text-3xl font-bold text-cyan-300">1000+</div>
            <div className="text-xs text-slate-400 mt-1">Complaints Resolved</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-300">500+</div>
            <div className="text-xs text-slate-400 mt-1">Active Citizens</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-emerald-300">50+</div>
            <div className="text-xs text-slate-400 mt-1">Authorities</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Simple Citizen Auth
function CitizenAuth({ onAuthed, onBack }) {
  const [tab, setTab] = useState("login");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  async function submit(e) {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const data =
        tab === "login"
          ? await api.login({ email: form.email, password: form.password })
          : await api.register({ name: form.name, email: form.email, password: form.password });
      onAuthed({ token: data.token, user: data.user });
    } catch (ex) {
      setErr(ex.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md">
        <button 
          onClick={onBack}
          className="mb-6 btn-citizen flex items-center gap-2"
        >
          ← Back
        </button>
        
        <div className="glass-citizen rounded-2xl p-6">
          <div className="text-center mb-6">
            <div className="text-5xl mb-3">👥</div>
            <h2 className="text-2xl font-bold text-cyan-300 mb-2">
              {tab === "login" ? "Welcome Back!" : "Join Us"}
            </h2>
            <p className="text-slate-400 text-sm">
              {tab === "login" ? "Login to file complaints" : "Create your account"}
            </p>
          </div>

          <div className="flex gap-2 mb-4">
            <button
              className={`flex-1 py-2 rounded-lg font-semibold transition-all text-sm ${
                tab === "login"
                  ? "bg-cyan-400/20 text-cyan-300 border border-cyan-400/40"
                  : "bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10"
              }`}
              onClick={() => setTab("login")}
            >
              Login
            </button>
            <button
              className={`flex-1 py-2 rounded-lg font-semibold transition-all text-sm ${
                tab === "signup"
                  ? "bg-cyan-400/20 text-cyan-300 border border-cyan-400/40"
                  : "bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10"
              }`}
              onClick={() => setTab("signup")}
            >
              Sign Up
            </button>
          </div>

          <form className="space-y-3" onSubmit={submit}>
            {tab === "signup" && (
              <input
                className="input"
                placeholder="Full name"
                value={form.name}
                onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
              />
            )}
            <input
              className="input"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
            />
            <input
              className="input"
              placeholder="Password (min 6 chars)"
              type="password"
              value={form.password}
              onChange={(e) => setForm((s) => ({ ...s, password: e.target.value }))}
            />
            {err && (
              <div className="text-sm text-red-300 bg-red-500/10 border border-red-500/20 rounded-lg p-2">
                {err}
              </div>
            )}
            <button
              className="btn-citizen w-full py-3 rounded-lg font-semibold"
              disabled={loading}
              type="submit"
            >
              {loading ? "Please wait..." : tab === "login" ? "Login" : "Create Account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// Simple Authority Auth
function AuthorityAuth({ onAuthed, onBack }) {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [form, setForm] = useState({ category: "Police", secretCode: "" });

  async function submit(e) {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const data = await api.authorityLogin(form);
      onAuthed({ token: data.token, authority: data.authority });
    } catch (ex) {
      setErr(ex.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md">
        <button 
          onClick={onBack}
          className="mb-6 btn-authority flex items-center gap-2"
        >
          ← Back
        </button>
        
        <div className="glass-authority rounded-2xl p-6 animate-authorityGlow">
          <div className="text-center mb-6">
            <div className="text-5xl mb-3">🏛️</div>
            <h2 className="text-2xl font-bold text-purple-300 mb-2">Authority Login</h2>
            <p className="text-slate-400 text-sm">Access your department dashboard</p>
          </div>

          <form className="space-y-3" onSubmit={submit}>
            <select
              className="input"
              value={form.category}
              onChange={(e) => setForm((s) => ({ ...s, category: e.target.value }))}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <input
              className="input"
              placeholder="Secret code"
              value={form.secretCode}
              onChange={(e) => setForm((s) => ({ ...s, secretCode: e.target.value }))}
            />
            {err && (
              <div className="text-sm text-red-300 bg-red-500/10 border border-red-500/20 rounded-lg p-2">
                {err}
              </div>
            )}
            <button
              className="btn-authority w-full py-3 rounded-lg font-semibold"
              disabled={loading}
              type="submit"
            >
              {loading ? "Please wait..." : "Access Dashboard"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// Camera Modal (keeping existing functionality)
function CameraModal({ open, onClose, onCapture }) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [status, setStatus] = useState("idle");
  const [err, setErr] = useState("");

  async function stop() {
    if (streamRef.current) {
      for (const t of streamRef.current.getTracks()) t.stop();
      streamRef.current = null;
    }
    if (videoRef.current) videoRef.current.srcObject = null;
  }

  async function start() {
    setErr("");
    setStatus("starting");
    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        setStatus("error");
        setErr("Camera not supported in this browser.");
        return;
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" } },
        audio: false
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setStatus("ready");
    } catch (e) {
      const msg = String(e?.message || e || "");
      const denied =
        e?.name === "NotAllowedError" ||
        e?.name === "PermissionDeniedError" ||
        msg.toLowerCase().includes("permission") ||
        msg.toLowerCase().includes("denied");
      setStatus(denied ? "denied" : "error");
      setErr(denied ? "Camera permission denied. Allow camera access and try again." : "Failed to start camera.");
      await stop();
    }
  }

  async function snap() {
    if (!videoRef.current) return;
    const v = videoRef.current;
    const w = v.videoWidth || 1280;
    const h = v.videoHeight || 720;

    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(v, 0, 0, w, h);

    const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.9));
    if (!blob) return;
    const file = new File([blob], `civiclink-photo-${Date.now()}.jpg`, { type: "image/jpeg" });
    onCapture(file);
    await stop();
    onClose();
  }

  useEffect(() => {
    if (!open) return;
    start();
    return () => {
      stop();
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4">
      <div className="glass-citizen w-full max-w-2xl rounded-2xl p-4 animate-fadeInUp">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-lg font-semibold">Take picture</div>
            <div className="text-xs text-slate-400">We'll ask for camera permission in your browser.</div>
          </div>
          <button className="btn" type="button" onClick={async () => { await stop(); onClose(); }}>
            Close
          </button>
        </div>

        <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-black/30">
          <video ref={videoRef} className="w-full h-[360px] object-cover" playsInline muted />
        </div>

        {err ? <div className="mt-3 text-sm text-amber-200">{err}</div> : null}

        <div className="mt-4 flex flex-wrap gap-3 justify-end">
          <button className="btn" type="button" onClick={start} disabled={status === "starting"}>
            Retry
          </button>
          <button className="btn btn-citizen" type="button" onClick={snap} disabled={status !== "ready"}>
            Capture photo
          </button>
        </div>
      </div>
    </div>
  );
}

// Stage Timeline (keeping existing)
function StageTimeline({ currentStage }) {
  const activeIdx = Math.max(0, STAGES.indexOf(currentStage));
  return (
    <div className="mt-3">
      <div className="flex flex-wrap items-center gap-2">
        {STAGES.map((s, idx) => {
          const done = idx <= activeIdx;
          return (
            <div key={s} className="flex items-center gap-2">
              <div
                className={[
                  "h-8 w-8 rounded-full grid place-items-center text-xs border transition-all",
                  done ? "bg-cyan-400/15 border-cyan-300/30 text-cyan-100" : "bg-white/5 border-white/10 text-slate-300"
                ].join(" ")}
                title={s}
              >
                {idx + 1}
              </div>
              {idx !== STAGES.length - 1 && (
                <div className={done ? "h-px w-10 bg-cyan-300/30" : "h-px w-10 bg-white/10"} />
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-2 text-xs text-slate-400">
        Current: <span className="text-slate-100">{currentStage}</span>
      </div>
    </div>
  );
}

function Avatar({ src, name, size = 48 }) {
  const initials = (name || "?")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");

  return src ? (
    <img
      src={src}
      alt={name || "avatar"}
      className="h-full w-full rounded-full object-cover"
      width={size}
      height={size}
    />
  ) : (
    <div
      className="grid h-full w-full place-items-center rounded-full bg-cyan-500/15 text-lg font-semibold text-cyan-200"
      style={{ minWidth: size, minHeight: size }}
    >
      {initials || "CL"}
    </div>
  );
}

// Simple Top Bar
function TopBar({ mode, setMode, who, onLogout, onBack }) {
  return (
    <div className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/50 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="btn mr-2">
            ←
          </button>
          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-cyan-400/20 to-purple-400/20 border border-cyan-300/20 grid place-items-center font-semibold text-sm">
            CL
          </div>
          <div className="text-lg font-semibold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            CivicLink
          </div>
        </div>
        <div className="flex items-center gap-2">
          {who ? (
            <>
              <div className="hidden sm:block text-xs text-slate-200 glass rounded-lg px-3 py-1.5">{who}</div>
              <button className="btn" onClick={onLogout} type="button">
                Logout
              </button>
            </>
          ) : (
            <>
              <button className={mode === "citizen" ? "btn-citizen" : "btn"} onClick={() => setMode("citizen")} type="button">
                Citizen
              </button>
              <button className={mode === "authority" ? "btn-authority" : "btn"} onClick={() => setMode("authority")} type="button">
                Authority
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// Citizen Dashboard
function CitizenApp({ token, user, onBack }) {
  const [gps, setGps] = useState({ lat: null, lng: null, accuracyM: null, updatedAt: null, status: "idle" });
  const [file, setFile] = useState(null);
  const [form, setForm] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [complaints, setComplaints] = useState([]);
  const [gpsErrorHint, setGpsErrorHint] = useState("");
  const [commentDraft, setCommentDraft] = useState({});
  const [commentSubmitting, setCommentSubmitting] = useState({});
  const [cameraOpen, setCameraOpen] = useState(false);
  const [photoModal, setPhotoModal] = useState({ open: false, url: "" });
  const cameraInputRef = useRef(null);
  const gpsWatchIdRef = useRef(null);

  const totalComplaints = complaints.length;
  const resolvedCount = complaints.filter((c) => c.currentStage === "Resolved").length;
  const inProgressCount = totalComplaints - resolvedCount;
  const resolvedNotifications = useMemo(() => complaints.filter((c) => c.currentStage === "Resolved"), [complaints]);

  const predicted = useMemo(() => {
    const d = (form.description || "").toLowerCase();
    if (!d.trim()) return "Auto";
    if (d.includes("traffic") || d.includes("signal") || d.includes("parking")) return "Traffic";
    if (d.includes("fraud") || d.includes("scam") || d.includes("otp") || d.includes("cyber")) return "Consumer/Cyber";
    if (d.includes("garbage") || d.includes("pothole") || d.includes("sewage")) return "Municipality";
    if (d.includes("pollution") || d.includes("smoke") || d.includes("noise")) return "Pollution";
    if (d.includes("school") || d.includes("college") || d.includes("university")) return "School/University";
    if (d.includes("rights") || d.includes("discrimination")) return "Human Rights";
    if (d.includes("theft") || d.includes("assault") || d.includes("police")) return "Police";
    if (d.includes("pension") || d.includes("ration") || d.includes("aadhar") || d.includes("corruption")) return "Govt Dept";
    return "Auto";
  }, [form.description]);

  async function loadMine() {
    const data = await api.myComplaints(token);
    setComplaints(data.complaints || []);
  }

  useEffect(() => {
    loadMine().catch(() => {});
  }, []);

  function stopWatchingLocation() {
    if (gpsWatchIdRef.current !== null && navigator.geolocation) {
      navigator.geolocation.clearWatch(gpsWatchIdRef.current);
      gpsWatchIdRef.current = null;
    }
  }

  function startWatchingLocation() {
    setGpsErrorHint("");
    setGps((s) => ({ ...s, status: "detecting" }));
    if (!navigator.geolocation) return setGps({ lat: null, lng: null, accuracyM: null, updatedAt: null, status: "unsupported" });

    stopWatchingLocation();
    gpsWatchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        setGps({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracyM: pos.coords.accuracy ?? null,
          updatedAt: Date.now(),
          status: "ok"
        });
      },
      (e) => {
        const denied = e && (e.code === 1 || String(e.message || "").toLowerCase().includes("permission"));
        setGps({ lat: null, lng: null, accuracyM: null, updatedAt: null, status: denied ? "denied" : "error" });
        setGpsErrorHint(
          denied
            ? "Location permission is blocked. Allow location for this site/browser and try again."
            : "Unable to read a precise location. If you're on desktop, enable Windows Location and use a Wi‑Fi network/GPS-enabled device."
        );
        stopWatchingLocation();
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 }
    );
  }

  useEffect(() => {
    startWatchingLocation();
    return () => stopWatchingLocation();
  }, []);

  async function submitComplaint(e) {
    e.preventDefault();
    setLoading(true);
    setErr("");
    setMsg("");
    try {
      await api.fileComplaint({ token, title: form.title, description: form.description, lat: gps.lat, lng: gps.lng, file });
      setMsg("Complaint filed successfully.");
      setForm({ title: "", description: "" });
      setFile(null);
      await loadMine();
    } catch (ex) {
      setErr(ex.message);
    } finally {
      setLoading(false);
    }
  }

  async function submitComment(complaintId) {
    const text = commentDraft[complaintId]?.trim();
    if (!text) return;
    setCommentSubmitting((prev) => ({ ...prev, [complaintId]: true }));
    try {
      await api.postComment(token, complaintId, text);
      setCommentDraft((prev) => ({ ...prev, [complaintId]: "" }));
      await loadMine();
    } catch (ex) {
      setErr(ex.message);
    } finally {
      setCommentSubmitting((prev) => ({ ...prev, [complaintId]: false }));
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <AttachmentModal open={photoModal.open} url={photoModal.url} onClose={() => setPhotoModal({ open: false, url: "" })} />
      <CameraModal
        open={cameraOpen}
        onClose={() => setCameraOpen(false)}
        onCapture={(f) => setFile(f)}
      />
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="glass-citizen rounded-2xl p-6 lg:col-span-2">
          <div className="mb-6 rounded-2xl border border-cyan-400/15 bg-white/5 p-6">
            <div className="flex flex-col gap-3">
              <div>
                <div className="text-xl font-semibold text-cyan-300">Citizen Dashboard</div>
                <div className="text-sm text-slate-400">A polished view for judges and citizens.</div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-slate-950/70 p-4 border border-white/5">
                  <div className="text-xs uppercase tracking-[0.16em] text-slate-500">Name</div>
                  <div className="mt-2 text-lg font-semibold text-slate-100">{user?.name || "Citizen"}</div>
                  <div className="text-xs text-slate-400">{user?.email || "No email provided"}</div>
                </div>
                <div className="rounded-2xl bg-slate-950/70 p-4 border border-white/5">
                  <div className="text-xs uppercase tracking-[0.16em] text-slate-500">Complaint summary</div>
                  <div className="mt-3 grid grid-cols-3 gap-3 text-center">
                    <div>
                      <div className="text-2xl font-semibold text-cyan-300">{totalComplaints}</div>
                      <div className="text-xs text-slate-400">Total</div>
                    </div>
                    <div>
                      <div className="text-2xl font-semibold text-emerald-300">{resolvedCount}</div>
                      <div className="text-xs text-slate-400">Resolved</div>
                    </div>
                    <div>
                      <div className="text-2xl font-semibold text-amber-300">{inProgressCount}</div>
                      <div className="text-xs text-slate-400">Open</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-xl font-semibold text-cyan-300 mb-4">File Complaint</div>

          <form className="space-y-3" onSubmit={submitComplaint}>
            <input className="input" placeholder="Title" value={form.title} onChange={(e) => setForm((s) => ({ ...s, title: e.target.value }))} />
            <textarea className="input min-h-[120px]" placeholder="Description (used for AI keyword routing)" value={form.description} onChange={(e) => setForm((s) => ({ ...s, description: e.target.value }))} />
            <div className="flex items-center justify-between gap-3 text-sm text-slate-300">
              <div>
                Predicted: <span className="text-slate-100">{predicted}</span>
              </div>
              <button className="btn" onClick={startWatchingLocation} type="button">
                Select location
              </button>
            </div>
            <div className="text-xs text-slate-400">
              GPS: {" "}
              {gps.status === "ok"
                ? `${gps.lat?.toFixed(6)}, ${gps.lng?.toFixed(6)}`
                : gps.status === "detecting"
                  ? "Detecting..."
                  : gps.status === "denied"
                    ? "Permission denied"
                    : gps.status === "error"
                      ? "Error"
                    : gps.status === "unsupported"
                      ? "Not supported"
                      : "Not set"}
            </div>
            {gpsErrorHint ? <div className="text-xs text-amber-200">{gpsErrorHint}</div> : null}

            <div className="text-xs text-slate-300">Upload media</div>
            <div className="flex items-center gap-3">
              <label className="btn btn-citizen cursor-pointer select-none">
                Choose file
                <input
                  className="hidden"
                  type="file"
                  accept="image/jpeg,image/png,image/gif,image/webp,image/bmp,image/tiff,image/svg+xml"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
              </label>

              <button
                className="btn btn-citizen"
                type="button"
                onClick={() => setCameraOpen(true)}
              >
                Take picture
              </button>

              <button className="btn" type="button" onClick={() => setFile(null)} disabled={!file}>
                Clear
              </button>
            </div>
            <div className="text-xs text-slate-400">{file?.name ? file.name : "No file chosen"}</div>
            {err && <div className="text-sm text-red-300">{err}</div>}
            {msg && <div className="text-sm text-emerald-200">{msg}</div>}
            <button className="btn btn-citizen w-full" disabled={loading} type="submit">
              {loading ? "Submitting..." : "Submit Complaint"}
            </button>
          </form>
        </div>

        <div className="glass rounded-2xl p-6 lg:col-span-3">
          <div className="flex items-end justify-between gap-3">
            <div>
              <div className="text-xl font-semibold text-slate-100">My Complaints</div>
              <div className="text-sm text-slate-400">Track your complaint progress</div>
            </div>
            <button className="btn" onClick={() => loadMine().catch(() => {})} type="button">
              Refresh
            </button>
          </div>

          {resolvedNotifications.length > 0 ? (
            <div className="mt-4 rounded-2xl border border-emerald-400/20 bg-emerald-500/5 p-4 text-sm text-emerald-200">
              <div className="font-semibold">Your problem has been resolved.</div>
              <div className="text-slate-300 mt-1">We have updated the status of {resolvedNotifications.length} resolved complaint{resolvedNotifications.length === 1 ? "" : "s"}.</div>
            </div>
          ) : null}

          <div className="mt-5 grid gap-4">
            {complaints.length === 0 ? (
              <div className="text-sm text-slate-400">No complaints yet. File your first one!</div>
            ) : (
              complaints.map((c) => (
                <div key={c._id} className="rounded-2xl border border-white/10 bg-white/5 p-5 card-hover">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="font-semibold text-cyan-300">{c.title}</div>
                  <div className="text-xs rounded-full border border-white/10 bg-white/5 px-3 py-1">{c.category}</div>
                </div>
                <div className="mt-3 flex items-center gap-3 text-sm text-slate-400">
                  <div className="h-9 w-9 overflow-hidden rounded-full bg-slate-900 border border-white/10">
                    <Avatar name={user?.name} size={36} />
                  </div>
                  <div>Filed by you</div>
                </div>
                <div className="mt-3 text-sm text-slate-300">{c.description}</div>
                {c.attachmentUrl ? (
                  <div className="mt-4 space-y-3">
                    <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-950/40">
                      <img 
                        src={c.attachmentUrl} 
                        alt="Complaint attachment" 
                        className="h-full w-full max-h-72 object-cover cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => setPhotoModal({ open: true, url: c.attachmentUrl })}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentElement.innerHTML = '<div class="p-8 text-center text-slate-400 text-sm">Image could not be loaded</div>';
                        }}
                      />
                    </div>
                    <button
                      className="btn btn-citizen w-full py-2 text-sm"
                      onClick={() => setPhotoModal({ open: true, url: c.attachmentUrl })}
                    >
                      View Full Image
                    </button>
                  </div>
                ) : null}
                <StageTimeline currentStage={c.currentStage} />
                {c.comments?.length > 0 && (
                  <div className="mt-4 rounded-2xl bg-white/5 p-4">
                    <div className="text-sm font-semibold text-slate-100 mb-3">Comments</div>
                    <div className="space-y-3">
                      {c.comments.map((comment, idx) => (
                        <div key={idx} className="rounded-2xl border border-white/10 bg-slate-950/70 p-3">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 overflow-hidden rounded-full bg-slate-900 border border-white/10">
                              <Avatar src={comment.authorPhotoUrl} name={comment.authorName} size={32} />
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-slate-100">
                                {comment.authorName}
                                <span className="ml-2 text-xs text-slate-500">({comment.authorRole})</span>
                              </div>
                              <div className="text-xs text-slate-400">{new Date(comment.at).toLocaleString()}</div>
                            </div>
                          </div>
                          <div className="mt-2 text-sm text-slate-300">{comment.text}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <div className="mt-4 space-y-3">
                  <textarea
                    className="input min-h-[100px]"
                    placeholder="Add a comment to your complaint"
                    value={commentDraft[c._id] || ""}
                    onChange={(e) => setCommentDraft((s) => ({ ...s, [c._id]: e.target.value }))}
                  />
                  <button
                    className="btn btn-citizen"
                    type="button"
                    disabled={!commentDraft[c._id]?.trim() || commentSubmitting[c._id]}
                    onClick={() => submitComment(c._id)}
                  >
                    {commentSubmitting[c._id] ? "Posting..." : "Post comment"}
                  </button>
                </div>
              </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Authority App with progress tracking and evidence upload
function AuthorityApp({ token, authority, onBack }) {
  const [complaints, setComplaints] = useState([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);
  const [stageDraft, setStageDraft] = useState({});
  const [noteDraft, setNoteDraft] = useState({});
  const [evidenceDraft, setEvidenceDraft] = useState({});
  const [evidenceUploading, setEvidenceUploading] = useState({});
  const [messageCount, setMessageCount] = useState({});
  const [commentDraft, setCommentDraft] = useState({});
  const [commentSubmitting, setCommentSubmitting] = useState({});
  const [photoModal, setPhotoModal] = useState({ open: false, url: "" });

  async function load() {
    setErr("");
    setLoading(true);
    try {
      const data = await api.authorityComplaints(token);
      setComplaints(data.complaints || []);
    } catch (ex) {
      setErr(ex.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function update(id) {
    try {
      await api.updateStage(token, id, stageDraft[id] || "In Review", noteDraft[id] || "");
      await load();
    } catch (ex) {
      setErr(ex.message);
    }
  }

  async function submitComment(id) {
    const text = commentDraft[id]?.trim();
    if (!text) return;
    setCommentSubmitting((prev) => ({ ...prev, [id]: true }));
    try {
      await api.postComment(token, id, text);
      setCommentDraft((prev) => ({ ...prev, [id]: "" }));
      await load();
    } catch (ex) {
      setErr(ex.message);
    } finally {
      setCommentSubmitting((prev) => ({ ...prev, [id]: false }));
    }
  }

  async function uploadEvidence(id) {
    const file = evidenceDraft[id];
    if (!file) return;
    setEvidenceUploading((prev) => ({ ...prev, [id]: true }));
    try {
      await api.uploadEvidence(token, id, file);
      setEvidenceDraft((prev) => ({ ...prev, [id]: null }));
      await load();
    } catch (ex) {
      setErr(ex.message);
    } finally {
      setEvidenceUploading((prev) => ({ ...prev, [id]: false }));
    }
  }

  function handleEvidenceUpload(id, file) {
    setEvidenceDraft((prev) => ({ ...prev, [id]: file }));
  }

  function handleMessage(id) {
    setMessageCount((prev) => {
      const newCount = (prev[id] || 0) + 1;
      if (newCount >= 10) {
        setErr("Message limit reached. This complaint has been blocked from further messages.");
        return { ...prev, [id]: newCount };
      }
      return { ...prev, [id]: newCount };
    });
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <AttachmentModal open={photoModal.open} url={photoModal.url} onClose={() => setPhotoModal({ open: false, url: "" })} />
      <div className="glass-authority rounded-2xl p-6 animate-fadeInUp">
        <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
          <div>
            <div className="text-2xl font-bold text-purple-300">Authority Dashboard</div>
            <div className="text-sm text-slate-400 mt-1">
              Category: <span className="text-purple-300 font-semibold">{authority?.category}</span>
            </div>
          </div>
          <button className="btn" onClick={() => load()} type="button">
            Refresh
          </button>
        </div>

        {err && (
          <div className="mb-4 text-sm text-red-300 bg-red-500/10 border border-red-500/20 rounded-xl p-3 animate-fadeIn">
            {err}
          </div>
        )}
        
        {loading ? (
          <div className="mt-6 text-sm text-slate-400">Loading complaints...</div>
        ) : complaints.length === 0 ? (
          <div className="mt-6 text-sm text-slate-400">No complaints for this category.</div>
        ) : (
          <div className="grid gap-6">
            {complaints.map((c) => (
              <div key={c._id} className="rounded-2xl border border-purple-400/20 bg-purple-500/5 p-6 card-hover">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <div className="text-xl font-semibold text-purple-300">{c.title}</div>
                  <div className="text-xs rounded-full border border-purple-400/30 bg-purple-500/10 px-3 py-1">
                    {c.currentStage}
                  </div>
                </div>
                
                <div className="mb-4 text-sm text-slate-300">
                  <span className="text-slate-400">Citizen:</span> {c.citizen?.name || "Unknown"} 
                  <span className="text-slate-500 ml-2">({c.citizen?.email || "no email"})</span>
                </div>
                
                <div className="mb-4 text-sm text-slate-300 bg-white/5 rounded-xl p-4">
                  {c.description}
                </div>
                
                <StageTimeline currentStage={c.currentStage} />

                {c.attachmentUrl ? (
                  <div className="mt-4 space-y-3">
                    <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-950/40">
                      <img 
                        src={c.attachmentUrl} 
                        alt="Complaint attachment" 
                        className="h-full w-full max-h-72 object-cover cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => setPhotoModal({ open: true, url: c.attachmentUrl })}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentElement.innerHTML = '<div class="p-8 text-center text-slate-400 text-sm">Image could not be loaded</div>';
                        }}
                      />
                    </div>
                    <button
                      className="btn btn-authority w-full py-2 text-sm"
                      onClick={() => setPhotoModal({ open: true, url: c.attachmentUrl })}
                    >
                      View Full Image
                    </button>
                  </div>
                ) : null}

                {c.evidenceUrl ? (
                  <div className="mt-4 space-y-3">
                    <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/5 p-3">
                      <div className="px-4 py-2 text-xs uppercase tracking-[0.18em] text-emerald-200">Authority Evidence</div>
                    </div>
                    <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-950/40">
                      <img 
                        src={c.evidenceUrl} 
                        alt="Authority evidence" 
                        className="h-full w-full max-h-72 object-cover cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => setPhotoModal({ open: true, url: c.evidenceUrl })}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentElement.innerHTML = '<div class="p-8 text-center text-slate-400 text-sm">Evidence image could not be loaded</div>';
                        }}
                      />
                    </div>
                    <button
                      className="btn btn-authority w-full py-2 text-sm"
                      onClick={() => setPhotoModal({ open: true, url: c.evidenceUrl })}
                    >
                      View Evidence
                    </button>
                  </div>
                ) : null}

                {c.timeline?.length > 1 && (
                  <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-sm font-semibold text-slate-100 mb-2">Status timeline</div>
                    <div className="space-y-2 text-xs text-slate-400">
                      {c.timeline.map((item, idx) => (
                        <div key={idx} className="rounded-lg bg-slate-950/70 p-3 border border-white/5">
                          <div className="font-semibold text-slate-100">{item.stage}</div>
                          <div>{item.note}</div>
                          <div className="mt-1 text-[11px] text-slate-500">{new Date(item.at).toLocaleString()}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {c.comments?.length > 0 && (
                  <div className="mt-4 rounded-2xl bg-white/5 p-4">
                    <div className="text-sm font-semibold text-slate-100 mb-3">Comments</div>
                    <div className="space-y-3">
                      {c.comments.map((comment, idx) => (
                        <div key={idx} className="rounded-2xl border border-white/10 bg-slate-950/70 p-3">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 overflow-hidden rounded-full bg-slate-900 border border-white/10">
                              <Avatar src={comment.authorPhotoUrl} name={comment.authorName} size={32} />
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-slate-100">
                                {comment.authorName}
                                <span className="ml-2 text-xs text-slate-500">({comment.authorRole})</span>
                              </div>
                              <div className="text-xs text-slate-400">{new Date(comment.at).toLocaleString()}</div>
                            </div>
                          </div>
                          <div className="mt-2 text-sm text-slate-300">{comment.text}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-4 space-y-3">
                  <textarea
                    className="input min-h-[100px]"
                    placeholder="Add a comment to this complaint"
                    value={commentDraft[c._id] || ""}
                    onChange={(e) => setCommentDraft((s) => ({ ...s, [c._id]: e.target.value }))}
                  />
                  <button
                    className="btn btn-authority"
                    type="button"
                    disabled={!commentDraft[c._id]?.trim() || commentSubmitting[c._id]}
                    onClick={() => submitComment(c._id)}
                  >
                    {commentSubmitting[c._id] ? "Posting..." : "Post comment"}
                  </button>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  <select
                    className="input"
                    value={stageDraft[c._id] || c.currentStage}
                    onChange={(e) => setStageDraft((s) => ({ ...s, [c._id]: e.target.value }))}
                  >
                    {STAGES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <input
                    className="input sm:col-span-2"
                    placeholder="Add description of work done..."
                    value={noteDraft[c._id] || ""}
                    onChange={(e) => setNoteDraft((s) => ({ ...s, [c._id]: e.target.value }))}
                  />
                </div>

                {/* Evidence Upload */}
                <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/50 p-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <label className="btn btn-authority cursor-pointer inline-flex items-center gap-2">
                      Choose evidence
                      <input
                        className="hidden"
                        type="file"
                        accept="image/jpeg,image/png,image/gif,image/webp,image/bmp,image/tiff,image/svg+xml"
                        onChange={(e) => handleEvidenceUpload(c._id, e.target.files?.[0])}
                      />
                    </label>
                    {evidenceDraft[c._id] && (
                      <button
                        className="btn btn-citizen"
                        type="button"
                        onClick={() => uploadEvidence(c._id)}
                        disabled={evidenceUploading[c._id]}
                      >
                        {evidenceUploading[c._id] ? "Uploading..." : "Send evidence"}
                      </button>
                    )}
                  </div>
                  {evidenceDraft[c._id] && (
                    <div className="mt-2 text-xs text-slate-400">Selected: {evidenceDraft[c._id].name}</div>
                  )}
                  {c.evidenceUrl ? (
                    <div className="mt-4 overflow-hidden rounded-2xl border border-emerald-400/20 bg-emerald-500/5">
                      <div className="px-4 py-2 text-xs uppercase tracking-[0.18em] text-emerald-200">Current evidence</div>
                      <img 
                        src={c.evidenceUrl} 
                        alt="Uploaded evidence" 
                        className="h-full w-full max-h-72 object-cover cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => setPhotoModal({ open: true, url: c.evidenceUrl })}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentElement.innerHTML = '<div class="p-8 text-center text-slate-400 text-sm">Evidence image could not be loaded</div>';
                        }}
                      />
                    </div>
                  ) : null}
                </div>

                {/* Message Counter */}
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-xs text-slate-400">
                    Messages sent: {messageCount[c._id] || 0}/10
                  </div>
                  <button
                    className="btn btn-authority"
                    onClick={() => handleMessage(c._id)}
                    disabled={(messageCount[c._id] || 0) >= 10}
                  >
                    Send Message {(messageCount[c._id] || 0) >= 10 ? "(Blocked)" : ""}
                  </button>
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    className="btn btn-authority"
                    onClick={() => update(c._id).catch(() => {})}
                    type="button"
                  >
                    Update Progress
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Main App Component
export default function App() {
  const [page, setPage] = useState("landing"); // landing | citizen-auth | authority-auth | citizen-app | authority-app
  const [mode, setMode] = useState("citizen");
  const [citizen, setCitizen] = useState(() => {
    const raw = localStorage.getItem("civiclink_citizen");
    return raw ? JSON.parse(raw) : null;
  });
  const [authority, setAuthority] = useState(() => {
    const raw = localStorage.getItem("civiclink_authority");
    return raw ? JSON.parse(raw) : null;
  });

  const who = citizen ? `Citizen: ${citizen.user?.name || "Citizen"}` : authority ? `Authority: ${authority.authority?.category}` : null;

  function logout() {
    localStorage.removeItem("civiclink_citizen");
    localStorage.removeItem("civiclink_authority");
    setCitizen(null);
    setAuthority(null);
    setPage("landing");
  }

  function handleSelectRole(role) {
    setMode(role);
    if (role === "citizen") {
      setPage("citizen-auth");
    } else {
      setPage("authority-auth");
    }
  }

  function handleBack() {
    setPage("landing");
  }

  // Show landing page if not logged in
  if (!citizen && !authority) {
    if (page === "landing") {
      return (
        <div className="min-h-screen bg-aurora">
          <LandingPage onSelectRole={handleSelectRole} />
        </div>
      );
    }

    if (page === "citizen-auth") {
      return (
        <div className="min-h-screen bg-aurora">
          <CitizenAuth
            onBack={handleBack}
            onAuthed={(data) => {
              localStorage.setItem("civiclink_citizen", JSON.stringify(data));
              setCitizen(data);
              setPage("citizen-app");
            }}
          />
        </div>
      );
    }

    if (page === "authority-auth") {
      return (
        <div className="min-h-screen bg-aurora">
          <AuthorityAuth
            onBack={handleBack}
            onAuthed={(data) => {
              localStorage.setItem("civiclink_authority", JSON.stringify(data));
              setAuthority(data);
              setPage("authority-app");
            }}
          />
        </div>
      );
    }
  }

  // Show dashboard if logged in
  return (
    <div className="min-h-screen bg-aurora">
      <TopBar
        mode={mode}
        setMode={setMode}
        who={who}
        onLogout={logout}
        onBack={handleBack}
      />
      {citizen ? (
        <CitizenApp
          token={citizen.token}
          user={citizen.user}
          onBack={handleBack}
        />
      ) : (
        <AuthorityApp token={authority.token} authority={authority.authority} onBack={handleBack} />
      )}
    </div>
  );
}
