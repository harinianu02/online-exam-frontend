console.log("auth.js loaded correctly");
window.onload = function () {
  console.log("✅ auth.js loaded successfully");

  const form = document.getElementById("loginForm");

  if (!form) {
    console.error("❌ loginForm not found");
    return;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const role = document.getElementById("role").value;

    if (username === "" || role === "") {
      alert("Please fill all details");
      return;
    }

    localStorage.setItem("username", username);
    localStorage.setItem("role", role);

    if (role === "student") {
      window.location.href = "exam.html";
    } else {
      window.location.href = "faculty-dashboard.html";
    }
  });
};
