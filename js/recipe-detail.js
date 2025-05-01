document.addEventListener('DOMContentLoaded', function () {
  const likeBtn = document.querySelector('.like-btn');
  let isLiked = false;

  likeBtn.addEventListener('click', function () {
    const heartIcon = this.querySelector('i');
    const likeCount = this.querySelector('span');

    if (isLiked) {
      heartIcon.className = 'far fa-heart';
      likeCount.textContent = parseInt(likeCount.textContent) - 1;
    } else {
      heartIcon.className = 'fas fa-heart';
      likeCount.textContent = parseInt(likeCount.textContent) + 1;
    }

    isLiked = !isLiked;
  });
});
