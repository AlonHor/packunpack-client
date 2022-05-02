const typeSelector = document.getElementById('type');
if (typeSelector.value === 'sunday') {
  for (let i = 1; i <= 11; i += 1) {
    const elem = document.getElementById(`optionalSunday${i}`);
    elem.hidden = false;
    dayCount = 6;
    if (i > 2) {
      elem.firstChild.value = '';
    }
  }
} else {
  dayCount = 5;
}

typeSelector.addEventListener('change', (e) => {
  const type = e.target.value;
  if (type === 'sunday') {
    for (let i = 1; i <= 11; i += 1) {
      const elem = document.getElementById(`optionalSunday${i}`);
      elem.hidden = false;
      dayCount = 6;
      if (i > 2) {
        elem.firstChild.value = '';
      }
    }
  } else {
    dayCount = 5;
    for (let i = 1; i <= 11; i += 1) {
      document.getElementById(`optionalSunday${i}`).hidden = true;
    }
  }
});
