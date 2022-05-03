// #logout-button onclick remove 'sid' from localStorage and redirect to '../'
document.getElementById('logout-button').addEventListener('click', () => {
  localStorage.removeItem('sid');
  window.location.href = '../';
});
