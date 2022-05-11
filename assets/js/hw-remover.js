function removeHw(hw) {
  fetch(`${server}/homework`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sid: sid,
      hw: hw,
    }),
  })
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      }
      throw new Error('Failed to remove homework');
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
      });
      fillHw();
    })
    .catch((err) => {
      alert(err);
    });
}
