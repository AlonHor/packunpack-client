function fillHw() {
  fetch(`${server}/sid/${sid}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        throw new Error("Failed to load homework");
      }
    })
    .then((user) => {
      document.getElementById("locker-viewer").hidden = true;
      document.getElementById("locker-value").innerHTML = "";
      if (user === { message: "Incorrect sid" }) {
        localStorage.removeItem("sid");
        window.location.href = "/";
      }
      const data = user.homework;
      if (data[0] === undefined) {
        document.getElementById("hw-viewer").hidden = true;
        return;
      } else if (data[1] === undefined) {
        document.getElementById("hw-viewer").hidden = true;
        return;
      }
      if (data[0].hw === undefined) {
        delete data[0];
      }
      document.getElementById("hw-viewer").hidden = false;
      document.getElementById("hw-viewer-value").innerHTML = "";
      document.getElementById("locker-value").innerHTML = "";
      data.forEach((hw) => {
        let name = hw.hw;
        const constDate = new Date(hw.date);
        let date = new Date(constDate.getTime());
        var tomorrowDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
        var tomorrowDay = tomorrowDate.getDate().toString();
        var tomorrowMonth = (tomorrowDate.getMonth() + 1).toString();
        var tomorrowYear = tomorrowDate.getFullYear().toString();
        day = date.getDate().toString();
        month = (date.getMonth() + 1).toString();
        year = date.getFullYear().toString();
        if (
          `${day}-${month}-${year}` ===
          `${tomorrowDay}-${tomorrowMonth}-${tomorrowYear}`
        ) {
          document.getElementById("locker-viewer").hidden = false;
          document.getElementById(
            "locker-value"
          ).innerHTML += `<li>${name}</li>`;
        }
        document.getElementById(
          "hw-viewer-value"
        ).innerHTML += `<li>${name} - (${day}/${month}/${year})&nbsp;<a type="button" style="color:red !important;" onClick="removeHw('${name}')">X</a></li>`;
      });
    })
    .catch(() => {});
}

fillHw();
