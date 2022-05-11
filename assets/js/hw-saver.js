var currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
var day = currentDate.getDate();
var month = currentDate.getMonth() + 1;
var year = currentDate.getFullYear();

day = day.toString();
month = month.toString();
year = year.toString();

if (month.length === 1) {
  month = '0' + month;
}

if (day.length === 1) {
  day = '0' + day;
}

document
  .getElementById('hw-date')
  .setAttribute('min', new Date().toISOString().split('T')[0]);

document.getElementById('hw-date').value = `${year}-${month}-${day}`;

document.getElementById('hw-button').addEventListener('click', (e) => {
  document.getElementById('hw-button').disabled = true;
  e.preventDefault();
  const hwValue = document.getElementById('hw-value').value;
  const hwDate = document.getElementById('hw-date').value;
  fetch(`${server}/homework`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sid: sid,
      hw: hwValue,
      date: hwDate,
    }),
  })
    .then((res) => {
      document.getElementById('hw-button').disabled = false;
      if (res.status === 200) {
        return res.json();
      } else {
        throw new Error('Failed to save homework');
      }
    })
    .then((data) => {
      document.getElementById('hw-viewer').hidden = false;
      document.getElementById('hw-viewer-value').innerHTML = '';
      data.forEach((hw) => {
        let name = hw.hw;
        const constDate = new Date(hw.date);
        let date = new Date(constDate.getTime());
        day = date.getDate().toString();
        month = (date.getMonth() + 1).toString();
        year = date.getFullYear().toString();
        document.getElementById(
          'hw-viewer-value'
        ).innerHTML += `<li>${name} - (${day}/${month}/${year})&nbsp;<a type="button" style="color:red !important;" onClick="removeHw('${name}')">X</a></li>`;
        document.getElementById('hw-value').value = '';
        document.getElementById('hw-date').value = `${year}-${month}-${day}`;
      });
      fillHw();
    })
    .catch((err) => {
      document.getElementById('hw-button').disabled = false;
      alert(err);
    });
});
