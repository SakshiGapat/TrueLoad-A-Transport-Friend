let selectedRole = "";

function selectRole(role) {
  selectedRole = role;
  document.getElementById("signup-form").style.display = "block";
  document.getElementById("loader-fields").style.display = role === "loader" ? "block" : "none";
  document.getElementById("truckOwner-fields").style.display = role === "truckOwner" ? "block" : "none";
}

document.getElementById("signup-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  const payload = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    role: selectedRole,
    extra: selectedRole === "loader" ? formData.get("load") : formData.get("truckNumber")
  };

  try {
    const res = await fetch("http://localhost:5000/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const result = await res.json();

    if (result.success) {
      showServices(payload.role);
    } else {
      alert("Signup failed. Please try again.");
    }
  } catch (error) {
    console.error("Signup error:", error);
    alert("An error occurred during signup.");
  }
});

function showServices(role) {
  const servicesDiv = document.getElementById("services");
  servicesDiv.style.display = "block";

  if (role === "loader") {
    servicesDiv.innerHTML = `
      <h3>Welcome, Loader!</h3>
      <ul>
        <li>📦 Find Available Trucks</li>
        <li>🔍 Compare Truck Rates</li>
        <li>🗓️ Schedule Pickups</li>
      </ul>
    `;
  } else if (role === "truckOwner") {
    servicesDiv.innerHTML = `
      <h3>Welcome, Truck Owner!</h3>
      <ul>
        <li>📥 View Load Requests</li>
        <li>📡 Connect with Loaders</li>
        <li>🚚 Manage Your Vehicles</li>
      </ul>
    `;
  }
}
