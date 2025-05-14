import { renderRecipes } from './render-recipes.js';

const uploadBtn = document.querySelector('.upload-btn');
uploadBtn.addEventListener('click', function () {
  window.location.href = 'html/recipe-form.html';
});

const categoryBtns = document.querySelectorAll('.category-btn');

const searchIcon = document.querySelector('.search-icon');
const searchInput = document.querySelector('.search-bar');

categoryBtns.forEach((button) => {
  button.addEventListener('click', function () {
    categoryBtns.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
    const category = button.textContent;
    const keyword = searchInput.value.toLowerCase();
    renderRecipes(keyword, categoryMap[category]);
  });
});

searchIcon.addEventListener('click', function () {
  const category = document.querySelector('.active').textContent;
  const keyword = searchInput.value.toLowerCase();
  renderRecipes(keyword, categoryMap[category]);
});

searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const category = document.querySelector('.active').textContent;
    const keyword = searchInput.value.toLowerCase();
    renderRecipes(keyword, categoryMap[category]);
  }
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

renderRecipes('', categoryMap['전체']);
