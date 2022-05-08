function generateDelta() {
  const table = saveTableData();
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  let todayDay = today.getDay();
  let tomorrowDay = tomorrow.getDay();

  todayDay -= 1;
  if (todayDay === -1) {
    todayDay = 6;
  }
  tomorrowDay -= 1;
  if (tomorrowDay === -1) {
    tomorrowDay = 6;
  }

  if (todayDay === 5 || todayDay === 6) {
    // if today is saturday or sunday
    todayDay = 4;
    tomorrowDay = 0;
  } else if (todayDay === 4) {
    // if today is friday
    tomorrowDay = 0;
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

  document.getElementById('remove-value').innerHTML = [...removeFromBag].join(
    ', '
  );
  document.getElementById('add-value').innerHTML = [...addToBag].join(', ');
}

window.onload = () => {
  generateDelta();
};
