const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

if (!sid) {
  window.location.href = `/`;
}

const tableId = params.id;
if (tableId) {
  fetch(`${server}/table/${tableId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sid: sid,
    }),
  })
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        throw new Error('Failed to login');
      }
    })
    .then((res) => {
      if (res.table) {
        let type = 'monday';
        if (res.table.length === 6) {
          type = 'sunday';
        }
        sessionStorage.setItem(
          'prefiller',
          JSON.stringify({ table: res.table, type: type })
        );
        if (sid) {
          window.location.href = '../dashboard';
        } else {
          window.location.href = '../login';
        }
      } else {
        if (res.message === 'Table not found') {
          throw new Error('Table not found');
        } else {
          throw new Error('Failed to login');
        }
      }
    })
    .catch((err) => {
      alert(err);
    });
}
