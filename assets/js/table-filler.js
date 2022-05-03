// fill in the html table with the data from the table

const theNamesOfTheDaysOfTheWeek = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
];

if (localStorage.getItem('prefiller')) {
  const prefiller = JSON.parse(localStorage.getItem('prefiller'));
  console.log(prefiller);
  localStorage.removeItem('prefiller');
  prefiller.forEach((dayOfTheWeek, indexOfTheDayOfTheWeek) => {
    // for each day
    dayOfTheWeek.forEach((subject, indexOfTheSubject) => {
      // for each subject
      const dayOfTheWeekConcactWithHour = `${
        theNamesOfTheDaysOfTheWeek[indexOfTheDayOfTheWeek]
      }${indexOfTheSubject + 1}`;
      document.getElementById(dayOfTheWeekConcactWithHour).value = subject;
    });
  });
  document.getElementById('save-button').click();
}

let tableData;
startLoader();
fetch(`${server}/sid/${sid}`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then((res) => {
    stopLoader();
    if (res.status === 200) {
      return res.json();
    } else {
      throw new Error('Failed to login');
    }
  })
  .then((res) => {
    if (res.table) {
      tableData = res.table;
      if (tableData) {
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
    } else {
      if (res.message) {
        if (res.message == 'Incorrect sid') {
          localStorage.removeItem('sid');
          window.location.href = '../';
        } else {
          throw new Error('Failed to login: ' + err.message);
        }
      }
    }
  })
  .catch((err) => {
    alert(err);
  });
