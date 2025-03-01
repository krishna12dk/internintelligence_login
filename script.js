document.addEventListener("DOMContentLoaded", function () {
    function toggleForm(formType) {
      document.getElementById("login-form").style.display = formType === "login" ? "block" : "none";
      document.getElementById("register-form").style.display = formType === "register" ? "block" : "none";
  
      // Toggle active class properly
      document.querySelectorAll(".link a").forEach((link) => link.classList.remove("active"));
      document.querySelector(`.link a[href='#${formType}']`).classList.add("active");
    }
  
    function registerUser(event) {
      event.preventDefault();
      let fullName = document.getElementById("register-name").value;
      let email = document.getElementById("register-email").value;
      let password = document.getElementById("register-password").value;
      let confirmPassword = document.getElementById("register-confirm-password").value;
  
      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
  
      if (localStorage.getItem(email)) {
        alert("User already exists! Try logging in.");
        return;
      }
  
      let user = { fullName, email, password };
      localStorage.setItem(email, JSON.stringify(user));
      alert("Registration successful! You can now log in.");
      toggleForm("login");
    }
  
    function loginUser(event) {
      event.preventDefault();
      let email = document.getElementById("login-email").value;
      let password = document.getElementById("login-password").value;
  
      let storedUser = localStorage.getItem(email);
      if (!storedUser) {
        alert("User not found! Please register.");
        return;
      }
  
      let userData = JSON.parse(storedUser);
      if (userData.password === password) {
        alert("Login successful! Welcome " + userData.fullName);
      } else {
        alert("Incorrect password! Please try again.");
      }
    }
  
    // Attach event listeners
    document.getElementById("registerForm").addEventListener("submit", registerUser);
    document.getElementById("loginForm").addEventListener("submit", loginUser);
    document.querySelector(".link a[href='#login']").addEventListener("click", () => toggleForm("login"));
    document.querySelector(".link a[href='#register']").addEventListener("click", () => toggleForm("register"));
  });
  