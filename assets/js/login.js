function redirectToDashboard() {
  localStorage.setItem("sid", "1149a53e-9e8c-4d96-bd7b-8b3d5bb0d67a"); // hardcoded sid for google adsense.
  window.location.href = "/dashboard";
}

localStorage.removeItem("sid");
const loginForm = document.getElementById("login-form");
const username = document.getElementById("username");
const password = document.getElementById("password");
password.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
  }
});
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const usernameValue = username.value;
  const passwordValue = password.value;
  fetch(`${server}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: usernameValue,
      password: passwordValue,
    }),
  })
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        throw new Error(res.json().message);
        // throw new Error("Failed to login");
      }
    })
    .then((res) => {
      if (res.sid) {
        if (res.id) {
          localStorage.setItem("sid", res.sid);
          window.location.href = "/dashboard";
        } else {
          if (res.message) {
            alert(res.message);
          } else {
            throw new Error(res.json().message);
            // throw new Error("Failed to login");
          }
        }
      } else {
        if (res.message) {
          alert(res.message);
        } else {
          throw new Error(res.json().message);
          // throw new Error("Failed to login");
        }
      }
    })
    .catch((err) => {
      alert(err);
    });
});
