document.addEventListener("DOMContentLoaded", () => {

  const container = document.querySelector(".form-wrapper");

  // BUTTONS
  const toLogin = document.getElementById("toLogin");
  const toSignup = document.getElementById("toSignup");
  const forgotPassword = document.getElementById("forgotPassword");
  const backToLogin = document.getElementById("backToLogin");

  // FORMS
  const signupForm = document.getElementById("signupForm");
  const loginForm = document.getElementById("loginForm");
  const resetForm = document.getElementById("resetForm");

  // ERRORS
  const signupError = document.getElementById("signupError");
  const loginError = document.getElementById("loginError");
  const resetError = document.getElementById("resetError");

  // INPUTS
  const signupUsername = document.getElementById("signupUsername");
  const signupEmail = document.getElementById("signupEmail");
  const signupPassword = document.getElementById("signupPassword");
  const signupConfirm = document.getElementById("signupConfirm");

  const loginEmail = document.getElementById("loginEmail");
  const loginPassword = document.getElementById("loginPassword");

  const resetEmail = document.getElementById("resetEmail");

  // EMAIL VALIDATION
  function isValidEmail(email) {

  // basic email format
  const emailRegex =
    /^[a-zA-Z0-9._%+-]+@(gmail|yahoo|outlook)\.com$/;

  // reject double dots like .comm or gmail..com
  if (email.includes("..")) {
    return false;
  }

  return emailRegex.test(email);
}

  // GO TO LOGIN
  toLogin.addEventListener("click", () => {
    container.classList.add("active");
    container.classList.remove("reset");
  });

  // GO TO SIGNUP
  toSignup.addEventListener("click", () => {
    container.classList.remove("active");
    container.classList.remove("reset");
  });

  // FORGOT PASSWORD
  forgotPassword.addEventListener("click", () => {
    container.classList.add("reset");
  });

  // BACK TO LOGIN
  backToLogin.addEventListener("click", () => {
    container.classList.remove("reset");
    container.classList.add("active");
  });

  // SIGNUP
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = signupUsername.value.trim();
    const email = signupEmail.value.trim();
    const password = signupPassword.value.trim();
    const confirm = signupConfirm.value.trim();

    signupError.innerText = "";

    if (!username || !email || !password || !confirm) {
      signupError.innerText = "All fields are required";
      return;
    }

    if (!isValidEmail(email)) {
      signupError.innerText = "Enter a valid email";
      return;
    }

    if (password.length < 6) {
      signupError.innerText =
        "Password must be at least 6 characters";
      return;
    }

    if (password !== confirm) {
      signupError.innerText = "Passwords do not match";
      return;
    }

    localStorage.setItem(
      "user",
      JSON.stringify({ username, email, password })
    );

    alert("Signup successful!");

    signupForm.reset();

    container.classList.add("active");
  });

  // LOGIN
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = loginEmail.value.trim();
    const password = loginPassword.value.trim();

    loginError.innerText = "";

    if (!email || !password) {
      loginError.innerText = "All fields are required";
      return;
    }

    if (!isValidEmail(email)) {
      loginError.innerText = "Enter a valid email";
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      loginError.innerText = "Please signup first";
      return;
    }

    if (email === user.email && password === user.password) {
      alert("Login successful!");
      loginForm.reset();
    } else {
      loginError.innerText = "Invalid email or password";
    }
  });

  // RESET PASSWORD
  resetForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = resetEmail.value.trim();

    resetError.innerText = "";

    if (!email) {
      resetError.innerText = "Enter your email";
      return;
    }

    if (!isValidEmail(email)) {
      resetError.innerText = "Enter valid email format";
      return;
    }

    alert("Reset link sent (demo)");

    resetForm.reset();
  });

});