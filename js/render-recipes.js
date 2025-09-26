async function loadRecipes() {
  const response = await fetch(
    'http://localhost:3000/api/recipes'
  );
  const data = await response.json();
  return data;
}

function createRecipeCard(recipe) {
  return `
    <div class="recipe-card" data-id=${recipe._id}>
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

export async function renderRecipes(keyword, category) {
  const recipes = await loadRecipes();
  const grid = document.querySelector('.recipe-grid');
  grid.innerHTML = '';

  recipes.forEach((recipe) => {
    const inCategory = category === 'all' || recipe.category === category;
    const inKeyword =
      recipe.title.toLowerCase().includes(keyword) ||
      recipe.description.toLowerCase().includes(keyword);
    if (inCategory && inKeyword) {
      grid.innerHTML += createRecipeCard(recipe);
    }
  });

  document.querySelectorAll('.recipe-card').forEach((card) => {
    card.addEventListener('click', () => {
      const recipeId = card.dataset.id;
      window.location.href = `html/recipe-detail.html?id=${recipeId}`;
    });
  });
}
