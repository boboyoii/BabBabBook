document.addEventListener('DOMContentLoaded', function () {
  const logo = document.querySelector('.logo');
  logo.addEventListener('click', function () {
    window.location.href = 'home.html';
  });

  const backBtn = document.querySelector('.back-btn');

  if (backBtn) {
    backBtn.addEventListener('click', function (e) {
      e.preventDefault();
      window.history.back();
    });
  }
});
