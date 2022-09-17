const shareButton = document.getElementById("share-button");
const shareLink = document.getElementById("share-link-value");
const shareDiv = document.getElementById("share-div");
const copyButton = document.getElementById("copy-button");

shareButton.addEventListener("click", () => {
  // used in another file
  let type = "monday";
  if (document.getElementById("sunday-checkbox").checked) {
    type = "sunday";
  }
  fetch(`${server}/sid/${sid}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        throw new Error("Failed to login");
      }
    })
    .then((res) => {
      const id = res.id;
      // used in another file
      const tableData = saveTableData();
      startLoader();
      if (id) {
        fetch(`${server}/share/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => {
            stopLoader();
            if (res.status === 200) {
              return res.json();
            } else {
              throw new Error("Failed to login");
            }
          })
          .then((res) => {
            if (res.id) {
              shareLink.innerHTML = `${window.location.origin}/share/?id=${res.id}`;
              shareDiv.hidden = false;
              copyButton.addEventListener("click", () => {
                // copy innerHTML of shareLink to clipboard
                const el = document.createElement("textarea");
                el.value = shareLink.innerHTML;
                document.body.appendChild(el);
                el.select();
                // deprecated
                document.execCommand("copy");
                document.body.removeChild(el);
                copyButton.innerHTML = "Copied";
              });
            } else {
              throw new Error("Failed to login");
            }
          })
          .catch((err) => {
            alert(err);
          });
      }
    });
});
