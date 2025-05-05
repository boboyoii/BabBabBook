async function loadRecipeDetail(id) {
  const response = await fetch(
    `https://babbabbook-default-rtdb.asia-southeast1.firebasedatabase.app/recipes/${id}.json`
  );
  const data = await response.json();
  return data;
}

function renderRecipeDetail(recipe) {
  document.querySelector('.recipe-header h1').textContent = recipe.title;
  document.querySelector('.category').textContent = recipe.category;
  document.querySelector('.recipe-description p').textContent =
    recipe.description;

  // 대표 이미지
  document.querySelector('.main-image img').src =
    recipe.mainImage || 'https://placehold.co/800x400';

  // 단계들
  const stepsContainer = document.querySelector('.recipe-steps');
  recipe.steps.forEach((step, index) => {
    const stepDiv = document.createElement('div');
    stepDiv.className = 'step';
    stepDiv.innerHTML = `
      <div class="step-image">
        <img src="${
          step.image || 'https://placehold.co/400x300'
        }" alt="조리 단계 ${index + 1}" />
      </div>
      <div class="step-content">
        <h3>단계 ${index + 1}</h3>
        <p>${step.description}</p>
      </div>
    `;
    stepsContainer.appendChild(stepDiv);
  });
}

async function deleteRecipe(recipeId) {
  const response = await fetch(
    `https://babbabbook-default-rtdb.asia-southeast1.firebasedatabase.app/recipes/${recipeId}.json`,
    {
      method: 'DELETE',
    }
  );

  if (response.ok) {
    alert('레시피가 성공적으로 삭제되었습니다!');
    window.location.href = 'home.html';
  } else {
    console.error('삭제 실패', await response.text());
  }
}

function moveToEditPage(recipeId) {
  if (recipeId) {
    window.location.href = `recipe-edit.html?id=${recipeId}`;
  } else {
    alert('레시피 ID가 없습니다!');
  }
}

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

async function loadRecipe() {
  const params = new URLSearchParams(window.location.search);
  const recipeId = params.get('id');

  if (recipeId) {
    const recipe = await loadRecipeDetail(recipeId);
    renderRecipeDetail(recipe);
  } else {
    alert('레시피 ID가 없습니다!');
  }

  const deleteBtn = document.querySelector('.delete-btn');
  deleteBtn.addEventListener('click', () => {
    const confirmDelete = confirm('정말 이 레시피를 삭제하시겠습니까?');
    if (confirmDelete) {
      deleteRecipe(recipeId);
    }
  });

  const editBtn = document.querySelector('.edit-btn');
  editBtn.addEventListener('click', () => moveToEditPage(recipeId));
}

loadRecipe();
