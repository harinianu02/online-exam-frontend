const studentName = localStorage.getItem("username");
const score = Number(localStorage.getItem("score"));
const totalQuestions = 5;
const totalMarks = totalQuestions * 1;
const percentage = ((score / totalMarks) * 100).toFixed(2);

document.getElementById("studentName").textContent = studentName;
document.getElementById("score").textContent = score;
document.getElementById("totalQuestions").textContent = totalQuestions;
document.getElementById("totalMarks").textContent = totalMarks;
document.getElementById("percentage").textContent = percentage;

function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}
