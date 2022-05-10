let theNamesOfTheDaysOfTheWeek = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
];

document.querySelectorAll('input[type=text]').forEach((input) => {
  input.value = '';
});

if (localStorage.getItem('prefiller')) {
  const prefiller = JSON.parse(localStorage.getItem('prefiller'));
  console.log(prefiller);
  localStorage.removeItem('prefiller');
  const prefillerData = prefiller.table;
  console.log(prefiller);
  if (prefiller.type === 'sunday') {
    dayCount = 6;
    for (let i = 1; i <= 11; i += 1) {
      const elem = document.getElementById(`optionalSunday${i}`);
      elem.hidden = false;
      dayCount = 6;
      if (i > 2) {
        elem.firstChild.value = '';
      }
    }
    theNamesOfTheDaysOfTheWeek = [
      'sunday',
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
    ];
    document.getElementById('sunday-checkbox').checked = true;
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
        if (res.type) {
          if (res.type === 'sunday') {
            dayCount = 6;
            for (let i = 1; i <= 11; i += 1) {
              const elem = document.getElementById(`optionalSunday${i}`);
              elem.hidden = false;
              dayCount = 6;
              if (i > 2) {
                elem.firstChild.value = '';
              }
            }
            theNamesOfTheDaysOfTheWeek = [
              'sunday',
              'monday',
              'tuesday',
              'wednesday',
              'thursday',
              'friday',
            ];
            document.getElementById('sunday-checkbox').checked = true;
          } else {
            document.getElementById('sunday-checkbox').checked = false;
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
      generateDelta();
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
