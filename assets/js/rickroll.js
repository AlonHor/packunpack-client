let audio = new Audio("/assets/sounds/rickroll.mp3");
window.addEventListener("visibilitychange", () => {
  console.log(document.visibilityState);
  if (document.visibilityState === "visible") {
    audio.pause();
  } else {
    audio.currentTime = 0;
    audio.play();
  }
});
