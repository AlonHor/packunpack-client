const key = new URLSearchParams(window.location.search).get("key");

fetch(`${server}/table/deny-edit-access`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    key,
  }),
})
  .then((res) => {
    if (res.status === 200) {
      return res.json();
    }
    throw new Error(res.json().message);
  })
  .then((data) => {
    if (data.message === "Successfully denied edit access") {
      document.getElementById("denying-access-h2").innerText =
        "Successfully denied edit access!";
    }
  });
