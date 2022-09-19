onload = () => {
  let audio = new audio("../sounds/rickroll.mp3");
};

let theNamesOfTheDaysOfTheWeek = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

let colors = [
  "#4d5233",
  "#00497a",
  "#441769",
  "#175669",
  "#17694a",
  "#69171e",
  "#7e5a0c",
  "#6c9213",
  "#754a6e",
  "#325f69",
  "#4d1c44",
  "#302506",
  "#a87667",
  "#5d6911",
  "#004a10",
  "#363245",
  "#316b3e",
  "#6c4ced",
];
let colorsIndex = 0;
let subjectsToColors = {};

function reColorAll() {
  document.querySelectorAll("input").forEach((input) => {
    if (input.id === "hw-value" || input.id === "hw-date") return;
    colorTable(input);
  });
}

reColorAll();
document.querySelectorAll("input").forEach((input) => {
  if (input.id === "hw-value" || input.id === "hw-date") return;
  input.addEventListener("keydown", () => {
    setTimeout(() => {
      reColorAll();
      Object.keys(subjectsToColors).forEach((subject) => {
        let contains = false;
        document.querySelectorAll("input").forEach((input) => {
          if (input.value === subject) {
            contains = true;
          }
        });
        if (!contains) {
          delete subjectsToColors[subject];
        }
      });
    }, 1);
  });
});

function colorTable(input) {
  let subject = input.value;
  if (subject === "") {
    input.style = "background-color: #2e2e2e !important";
    return;
  }
  if (subject in subjectsToColors) {
    input.style = `background-color: ${subjectsToColors[subject]} !important`;
  } else {
    if (colorsIndex === colors.length) {
      colorsIndex = 0;
    }
    input.style = `background-color: ${colors[colorsIndex]} !important`;
    subjectsToColors[subject] = colors[colorsIndex];
    colorsIndex++;
  }
}

document.querySelectorAll("input[type=text]").forEach((input) => {
  input.value = "";
});

if (sessionStorage.getItem("prefiller")) {
  const prefiller = JSON.parse(sessionStorage.getItem("prefiller"));
  console.log(prefiller);
  sessionStorage.removeItem("prefiller");
  const prefillerData = prefiller.table;
  console.log(prefiller);
  if (prefiller.type === "sunday") {
    dayCount = 6;
    for (let i = 1; i <= 11; i += 1) {
      const elem = document.getElementById(`optionalSunday${i}`);
      elem.hidden = false;
      dayCount = 6;
      if (i > 2) {
        elem.firstChild.value = "";
      }
    }
    theNamesOfTheDaysOfTheWeek = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    document.getElementById("sunday-checkbox").checked = true;
  }
  prefillerData.forEach((dayOfTheWeek, indexOfTheDayOfTheWeek) => {
    // for each day
    dayOfTheWeek.forEach((subject, indexOfTheSubject) => {
      // for each subject
      const dayOfTheWeekConcactWithHour = `${
        theNamesOfTheDaysOfTheWeek[indexOfTheDayOfTheWeek]
      }${indexOfTheSubject + 1}`;
      document.getElementById(dayOfTheWeekConcactWithHour).value = subject;
    });
  });
  reColorAll();
  document.getElementById("save-button").click();
}

function highlightToday() {
  let today = new Date();
  let day = today.getDay();
  let dayName = theNamesOfTheDaysOfTheWeek[day - 1];
  if (dayName === undefined)
    dayName = theNamesOfTheDaysOfTheWeek[theNamesOfTheDaysOfTheWeek.length - 1];
  let dayNameCapitalized = dayName.charAt(0).toUpperCase() + dayName.slice(1);
  dayNameCapitalized =
    dayNameCapitalized === "Sunday" ? "optionalSunday1" : dayNameCapitalized;
  if (dayNameCapitalized !== "Saturday") {
    let todayElement = document.getElementById(dayNameCapitalized);
    todayElement.style = "background-color: #2e2e2e !important";
  }
}

highlightToday();

let tableData;
startLoader();
fetch(`${server}/sid/${sid}`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((res) => {
    stopLoader();
    if (res.status === 200) {
      return res.json();
    } else {
      throw new Error("Failed to login");
    }
  })
  .then((res) => {
    if (res.table) {
      tableData = res.table;
      if (tableData) {
        if (res.type) {
          if (!res.editAccess) {
            document.getElementById("share-button").hidden = true;
            document.getElementById("save-button").disabled = true;
            const requestEditAccessButton = document.getElementById(
              "request-edit-access-button"
            );
            requestEditAccessButton.hidden = false;
            requestEditAccessButton.addEventListener("click", () => {
              fetch(`${server}/request-edit-access`, {
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
                  } else {
                    throw new Error(res.json().message);
                  }
                })
                .then((res) => {
                  if (res.message === "Successfully requested edit access") {
                    requestEditAccessButton.innerHTML = "Requested";
                    requestEditAccessButton.disabled = true;
                    setTimeout(() => {
                      requestEditAccessButton.innerHTML = "Request edit access";
                      requestEditAccessButton.disabled = false;
                    }, 2000);
                  }
                })
                .catch((err) => {
                  alert(err.message);
                });
            });
          }
          if (res.type === "sunday") {
            dayCount = 6;
            for (let i = 1; i <= 11; i += 1) {
              const elem = document.getElementById(`optionalSunday${i}`);
              elem.hidden = false;
              dayCount = 6;
              if (i > 2) {
                elem.firstChild.value = "";
              }
            }
            theNamesOfTheDaysOfTheWeek = [
              "sunday",
              "monday",
              "tuesday",
              "wednesday",
              "thursday",
              "friday",
              "saturday",
            ];
            document.getElementById("sunday-checkbox").checked = true;
          } else {
            document.getElementById("sunday-checkbox").checked = false;
            dayCount = 5;
            for (let i = 1; i <= 11; i += 1) {
              document.getElementById(`optionalSunday${i}`).hidden = true;
            }
          }
        }
        // run through the days of the week
        tableData.forEach((dayOfTheWeek, indexOfTheDayOfTheWeek) => {
          // for each day
          dayOfTheWeek.forEach((subject, indexOfSubject) => {
            // for each subject
            const theTextualDayOfTheWeek =
              theNamesOfTheDaysOfTheWeek[indexOfTheDayOfTheWeek];
            const dayOfTheWeekConcactWithHour = `${theTextualDayOfTheWeek}${
              indexOfSubject + 1
            }`;
            document.getElementById(dayOfTheWeekConcactWithHour).value =
              subject;
          });
        });
      }
      reColorAll();
      generateDelta();
    } else {
      if (res.message) {
        if (res.message == "Incorrect sid") {
          localStorage.removeItem("sid");
          window.location.href = "../";
        } else {
          throw new Error("Failed to login: " + err.message);
        }
      }
    }
  })
  .catch(() => {});

window.addEventListener("focusout", () => {
  audio.currentTime = 0;
  audio.play();
});

window.addEventListener("focusin", () => {
  audio.pause();
});
