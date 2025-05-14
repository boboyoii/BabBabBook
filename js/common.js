const logo = document.querySelector('.logo');
logo.addEventListener('click', function () {
  window.location.href = '/';
});

const backBtn = document.querySelector('.back-btn');

if (backBtn) {
  backBtn.addEventListener('click', function (e) {
    e.preventDefault();
    window.history.back();
  });
}
