async function loadRecipes() {
  const response = await fetch(
    'https://babbabbook-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json'
  );
  const data = await response.json();
  return data;
}

function createRecipeCard(recipe) {
  return `
    <div class="recipe-card">
      <img src="https://placehold.co/300x200" alt="레시피 이미지" />
      <div class="recipe-info">
        <h3>${recipe.title}</h3>
        <p>${recipe.description}</p>
        <div class="like-btn">
          <i class="far fa-heart"></i>
          <span>0</span>
        </div>
      </div>
    </div>
  `;
}

async function renderRecipes() {
  const recipes = await loadRecipes();
  const grid = document.querySelector('.recipe-grid');
  grid.innerHTML = ''; // 기존 카드 비우기

  Object.values(recipes).forEach((recipe) => {
    grid.innerHTML += createRecipeCard(recipe);
  });
}

document.addEventListener('DOMContentLoaded', renderRecipes);
