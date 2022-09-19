document.getElementById("reset").addEventListener("click", () => {
  // check email regex
  let email = document.getElementById("email").value;
  let emailRegex =
    /^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9-]+).([a-z]{2,20})(.[a-z]{2,8})?$/;

  if (emailRegex.test(email)) {
    document.getElementById("email").classList.remove("is-invalid");
    document.getElementById("email").classList.add("is-valid");
  } else {
    document.getElementById("email").classList.add("is-invalid");
    document.getElementById("email").classList.remove("is-valid");
    return;
  }
  fetch(`${server}/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
    }),
  }).then((res) => {
    if (res.status === 200) {
      alert("A confirmation email was sent to your email address.");
    } else {
      alert("Error sending email: " + res.json().message);
    }
  });
});
