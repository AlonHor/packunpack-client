var currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
var day = currentDate.getDate().toString();
var month = (currentDate.getMonth() + 1).toString();
var year = currentDate.getFullYear().toString();

if (month.length === 1) {
  month = "0" + month;
}

if (day.length === 1) {
  day = "0" + day;
}

document
  .getElementById("hw-date")
  .setAttribute("min", new Date().toISOString().split("T")[0]);

document.getElementById("hw-date").value = `${year}-${month}-${day}`;

document.getElementById("hw-button").addEventListener("click", (e) => {
  document.getElementById("hw-button").disabled = true;
  e.preventDefault();
  const hwValue = document.getElementById("hw-value").value;
  const hwDate = document.getElementById("hw-date").value;
  fetch(`${server}/homework`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sid: sid,
      hw: hwValue,
      date: hwDate,
    }),
  })
    .then((res) => {
      document.getElementById("hw-button").disabled = false;
      if (res.status === 200) {
        return res.json();
      } else {
        throw new Error("Failed to save homework");
      }
    })
    .then((data) => {
      document.getElementById("hw-value").value = "";
      var currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
      var day = currentDate.getDate().toString();
      var month = (currentDate.getMonth() + 1).toString();
      var year = currentDate.getFullYear().toString();

      if (month.length === 1) {
        month = "0" + month;
      }

      if (day.length === 1) {
        day = "0" + day;
      }
      document.getElementById("hw-date").value = year + "-" + month + "-" + day;
      fillHw();
    })
    .catch((err) => {
      document.getElementById("hw-button").disabled = false;
      alert(err);
    });
});
