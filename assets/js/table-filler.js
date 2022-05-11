let theNamesOfTheDaysOfTheWeek = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
];

let colors = [
  '#6e2a2a',
  '#00497a',
  '#441769',
  '#175669',
  '#17694a',
  '#69171e',
  '#7e5a0c',
  '#6c9213',
];
let colorsIndex = 0;
let subjectsToColors = {};

document.querySelectorAll('input').forEach((input) => {
  if (input.id === 'hw-value' || input.id === 'hw-date') return;
  colorTable(input);
  input.addEventListener('keyup', () => {
    colorTable(input);
    Object.keys(subjectsToColors).forEach((subject) => {
      let contains = false;
      document.querySelectorAll('input').forEach((input) => {
        if (input.value === subject) {
          contains = true;
        }
      });
      if (!contains) {
        delete subjectsToColors[subject];
      }
    });
  });
});

function colorTable(input) {
  let subject = input.value;
  if (subject === '') {
    input.style = 'background-color: #2e2e2e !important';
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
