import { renderRecipes } from './render-recipes.js';

const uploadBtn = document.querySelector('.upload-btn');
uploadBtn.addEventListener('click', function () {
  window.location.href = 'recipe-form.html';
});

const categoryBtns = document.querySelectorAll('.category-btn');
categoryBtns.forEach((button) => {
  button.addEventListener('click', function () {
    categoryBtns.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
    const category = button.textContent;
    renderRecipes(categoryMap[category]);
  });
});

const categoryMap = {
  전체: 'all',
  한식: 'korean',
  양식: 'western',
  중식: 'chinese',
  일식: 'japanese',
  디저트: 'dessert',
  편의점: 'convenience-store',
};

renderRecipes(categoryMap['전체']);
