document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault(); // STOP page reload

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const role = document.getElementById("role").value;

    if (username === "" || password === "" || role === "") {
        alert("Please fill all fields");
        return;
    }

    // Save login info (to avoid seeing login again)
    localStorage.setItem("username", username);
    localStorage.setItem("role", role);

    // Redirect based on role
    if (role === "student") {
        window.location.href = "exam.html";
    } else if (role === "faculty") {
        window.location.href = "faculty.html";
    }
});
