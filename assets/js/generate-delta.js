function generateDelta() {
  const table = saveTableData();
  const today = new Date();
  const tomorrow = new Date();
  const sunday = document.getElementById("sunday-checkbox").checked;
  tomorrow.setDate(today.getDate() + 1);
  let todayDay = today.getDay();
  let tomorrowDay = tomorrow.getDay();

  if (!sunday) {
    todayDay -= 1;
    todayDay = todayDay === -1 ? 6 : todayDay;

    tomorrowDay -= 1;
    tomorrowDay = tomorrowDay === -1 ? 6 : tomorrowDay;
  }

  if (sunday) {
    // if today is friday or saturday
    if (todayDay === 5 || todayDay === 6) {
      // set today to friday
      todayDay = 5;
      // set tomorrow to sunday
      tomorrowDay = 0;
    }
  } else {
    // if today is friday, saturday or sunday
    if (todayDay === 4 || todayDay === 5 || todayDay === 6) {
      // set today to friday
      todayDay = 4;
      // set tomorrow to monday
      tomorrowDay = 0;
    }
  }

  let week = {};
  for (let i = 0; i < table.length; i++) {
    week[i] = new Set(table[i]);
  }

  const removeFromBag = new Set(
    [...week[todayDay]].filter((subject) => !week[tomorrowDay].has(subject))
  );
  const addToBag = new Set(
    [...week[tomorrowDay]].filter((subject) => !week[todayDay].has(subject))
  );

  if (addToBag.size === 0 && removeFromBag.size === 0) {
    document.getElementById("delta-div").hidden = true;
  } else {
    document.getElementById("delta-div").hidden = false;
  }

  document.getElementById("remove-value").innerHTML = [...removeFromBag].join(
    ", "
  );
  document.getElementById("add-value").innerHTML = [...addToBag].join(", ");
}

window.onload = () => {
  generateDelta();
};
