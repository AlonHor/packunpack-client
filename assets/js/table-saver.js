const saveButton = document.getElementById("save-button");

function saveTableData() {
  let theNamesOfTheDaysOfTheWeek = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
  ];
  if (document.getElementById("sunday-checkbox").checked) {
    theNamesOfTheDaysOfTheWeek = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
    ];
  }
  // run through the days of the week
  const tableData = [];
  theNamesOfTheDaysOfTheWeek.forEach((dayOfTheWeek) => {
    // for each day
    const dayOfTheWeekData = [];
    for (let i = 1; i <= 10; i++) {
      // for each subject
      const dayOfTheWeekConcactWithHour = `${dayOfTheWeek}${i}`;
      const subject = document.getElementById(
        dayOfTheWeekConcactWithHour
      ).value;
      dayOfTheWeekData.push(subject);
    }
    tableData.push(dayOfTheWeekData);
  });
  return tableData;
}

saveButton.addEventListener("click", () => {
  const tableData = saveTableData();
  startLoader();
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
        throw new Error("Failed to login");
      }
    })
    .then((res) => {
      const id = res.id;
      if (id) {
        fetch(`${server}/table/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            table: tableData,
            sid: sid,
          }),
        })
          .then((res) => {
            stopLoader();
            if (res.status === 200 || res.status === 403) {
              return res.json();
            } else {
              throw new Error(res.json().message);
              // throw new Error('Failed to save');
            }
          })
          .then((res) => {
            if (res.message) {
              if (res.message === "Successfully updated table") {
                saveButton.disabled = true;
                saveButton.innerHTML = "Saved";
                document.getElementById("share-button").hidden = false;
                generateDelta();
                setTimeout(() => {
                  saveButton.innerHTML = "Save";
                  saveButton.disabled = false;
                }, 2000);
              } else if (res.message == "Incorrect sid") {
                localStorage.removeItem("sid");
                window.location.href = "../";
              } else if (
                res.message == "You do not have access to edit this table"
              ) {
                document.getElementById("share-button").hidden = true;
                saveButton.disabled = true;
                requestEditAccessButton = document.getElementById(
                  "request-edit-access-button"
                );
                requestEditAccessButton.hidden = false;
                requestEditAccessButton.addEventListener("click", () => {
                  fetch(`${server}/table/${id}/request-edit-access`, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      sid: sid,
                    }),
                  })
                    .then((res) => {
                      if (res.status === 200) {
                        return res.json();
                      }
                    })
                    .then((res) => {
                      if (
                        res.message === "Successfully requested edit access"
                      ) {
                        requestEditAccessButton.innerHTML = "Requested";
                        requestEditAccessButton.disabled = true;
                        setTimeout(() => {
                          requestEditAccessButton.innerHTML =
                            "Request edit access";
                          requestEditAccessButton.disabled = false;
                        }, 2000);
                      }
                    });
                });
              } else {
                throw new Error(res.json().message);
                // throw new Error('Failed to login: ' + err.message);
              }
            } else {
              throw new Error(res.json().message);
              // throw new Error('Failed to login');
            }
          })
          .catch((err) => {
            alert(err);
          });
      }
    })
    .catch((err) => {
      alert(err);
    });
});

function stopLoader() {
  const loader = document.getElementById("loader");
  const saveButton = document.getElementById("save-button");
  const shareButton = document.getElementById("share-button");
  loader.hidden = true;
  saveButton.disabled = false;
  shareButton.disabled = false;
}

function startLoader() {
  const loader = document.getElementById("loader");
  const saveButton = document.getElementById("save-button");
  const shareButton = document.getElementById("share-button");
  loader.hidden = false;
  saveButton.disabled = true;
  shareButton.disabled = true;
}
