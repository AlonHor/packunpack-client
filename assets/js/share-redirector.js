const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

const tableId = params.id;
if (tableId) {
  fetch(`${server}/table/${tableId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
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
        localStorage.setItem('prefiller', JSON.stringify(res.table));
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
