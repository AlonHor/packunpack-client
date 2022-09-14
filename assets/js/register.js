localStorage.removeItem("sid");
const registerForm = document.getElementById("register-form");
const email = document.getElementById("email");
const username = document.getElementById("username");
const password = document.getElementById("password");
const type = document.getElementById("type");
password.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
  }
});
registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const emailValue = email.value;
  const usernameValue = username.value;
  const passwordValue = password.value;
  const typeValue = type.value;
  fetch(`${server}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: emailValue,
      username: usernameValue,
      password: passwordValue,
      type: typeValue,
    }),
  })
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        throw new Error(res.json().message);
        // throw new Error('Failed to register');
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
            // throw new Error('Failed to register');
          }
        }
      } else {
        if (res.message) {
          alert(res.message);
        } else {
          throw new Error(res.json().message);
          // throw new Error('Failed to register');
        }
      }
    })
    .catch((err) => {
      alert(err);
    });
});
