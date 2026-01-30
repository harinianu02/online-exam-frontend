console.log("✅ proctor.js connected");

let violationCount = 0;
const MAX_VIOLATIONS = 3;

/* ================================
   FULLSCREEN ENFORCEMENT
================================ */
window.onload = () => {
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen().catch(() => {
      alert("⚠️ Please allow fullscreen mode for the exam");
    });
  }
};

/* ================================
   VIOLATION HANDLER
================================ */
function handleViolation(reason) {
  violationCount++;

  alert(`⚠️ Warning ${violationCount}: ${reason}`);

  console.log("Violation:", reason);

  if (violationCount >= MAX_VIOLATIONS) {
    alert("❌ Exam auto-submitted due to malpractice");

    if (typeof submitExam === "function") {
      submitExam();
    } else {
      console.error("submitExam() not found");
    }
  }
}

/* ================================
   DISABLE RIGHT CLICK
================================ */
document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  handleViolation("Right click is not allowed");
});

/* ================================
   DISABLE COPY / PASTE / CUT
================================ */
["copy", "paste", "cut"].forEach(evt => {
  document.addEventListener(evt, (e) => {
    e.preventDefault();
    handleViolation("Copy / Paste / Cut is not allowed");
  });
});

/* ================================
   DISABLE KEYBOARD SHORTCUTS
================================ */
document.addEventListener("keydown", (e) => {

  if (e.ctrlKey || e.altKey || e.key === "F12") {
    e.preventDefault();
    handleViolation("Keyboard shortcuts are disabled");
  }

  if (e.key === "Escape") {
    e.preventDefault();
    handleViolation("Escape key is not allowed");
  }
});

/* ================================
   TAB SWITCH DETECTION (SAFE)
================================ */
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    handleViolation("Tab switching detected");
  }
});
