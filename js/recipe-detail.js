function readData() {
  fetch(
    'https://babbabbook-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json'
  )
    .then((response) => response.json())
    .then((data) => {
      console.log('데이터 읽기 성공:', data);
    })
    .catch((error) => {
      console.error('에러 발생:', error);
    });
}

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

  readData();
});
