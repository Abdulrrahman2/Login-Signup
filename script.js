const authCard = document.getElementById("authCard");
const notice = document.getElementById("notice");
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

const signupEmail = signupForm.elements.email;
const signupPassword = signupForm.elements.password;
const signupPhone = signupForm.elements.phone;

// Switch the visible form and animate the colored overlay.
function showForm(formName) {
  const showSignup = formName === "signup";
  authCard.classList.toggle("is-signup", showSignup);

  // On phones the overlay is hidden, so the form itself switches in place.
  const activeForm = showSignup ? signupForm : loginForm;
  window.setTimeout(() => {
    activeForm.querySelector("input")?.focus({ preventScroll: true });
  }, 180);
}

document.querySelectorAll("[data-switch]").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    showForm(button.dataset.switch);
  });
});

let noticeTimer;
function showNotice(message) {
  notice.textContent = message;
  notice.classList.add("show");
  window.clearTimeout(noticeTimer);
  noticeTimer = window.setTimeout(() => notice.classList.remove("show"), 3500);
}

function isValidGmail(value) {
  return /^[a-zA-Z0-9._%+-]+@gmail\.com$/i.test(value.trim());
}

function isValidPhone(value) {
  const digits = value.replace(/[\s()+-]/g, "");
  return /^\d{10,15}$/.test(digits);
}

function isStrongPassword(value) {
  return value.length >= 8 &&
    /[a-z]/.test(value) &&
    /[A-Z]/.test(value) &&
    /\d/.test(value);
}

// Remove custom error messages as the user edits each field.
[signupEmail, signupPhone, signupPassword].forEach((input) => {
  input.addEventListener("input", () => input.setCustomValidity(""));
});

signupForm.addEventListener("submit", (event) => {
  event.preventDefault();

  [signupEmail, signupPhone, signupPassword].forEach((input) => {
    input.setCustomValidity("");
  });

  if (!signupForm.checkValidity()) {
    signupForm.reportValidity();
    return;
  }

  if (!isValidPhone(signupPhone.value)) {
    signupPhone.setCustomValidity("Enter a valid phone number using 10 to 15 digits.");
    signupPhone.reportValidity();
    signupPhone.focus();
    return;
  }

  if (!isValidGmail(signupEmail.value)) {
    signupEmail.setCustomValidity("Enter a valid Gmail address ending with @gmail.com.");
    signupEmail.reportValidity();
    signupEmail.focus();
    return;
  }

  if (!isStrongPassword(signupPassword.value)) {
    signupPassword.setCustomValidity(
      "Use at least 8 characters, including an uppercase letter, a lowercase letter, and a number."
    );
    signupPassword.reportValidity();
    signupPassword.focus();
    return;
  }

  showNotice("Done 🥸.");
});

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!loginForm.checkValidity()) {
    loginForm.reportValidity();
    return;
  }

  showNotice("Done 🥸 .");
});
