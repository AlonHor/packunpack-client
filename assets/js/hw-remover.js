function removeHw(hw) {
  fetch(`${server}/homework`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
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
      throw new Error("Failed to remove homework");
    })
    .then(() => {
      fillHw();
    })
    .catch((err) => {
      alert(err);
    });
}
