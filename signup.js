const form = document.getElementById("signupForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = form.name.value;
  const email = form.email.value;
  const password = form.password.value;
  const role = form.role.value;

  const response = await fetch("http://localhost:5000/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password, role }),
  });

  const data = await response.json();
  alert(data.message || "Signup complete");
});
