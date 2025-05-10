async function loadRecipes() {
  const response = await fetch(
    'https://babbabbook-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json'
  );
  const data = await response.json();
  return data;
}

function createRecipeCard(id, recipe) {
  return `
    <div class="recipe-card" data-id=${id}>
      <img src="${recipe.mainImage}" alt="레시피 이미지" />
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

export async function renderRecipes(category) {
  const recipes = await loadRecipes();
  const grid = document.querySelector('.recipe-grid');
  grid.innerHTML = '';

  Object.entries(recipes).forEach(([id, recipe]) => {
    if (category === 'all' || recipe.category === category) {
      grid.innerHTML += createRecipeCard(id, recipe);
    }
  });

  document.querySelectorAll('.recipe-card').forEach((card) => {
    card.addEventListener('click', () => {
      const recipeId = card.dataset.id;
      console.log(recipeId);
      window.location.href = `recipe-detail.html?id=${recipeId}`;
    });
  });
}
