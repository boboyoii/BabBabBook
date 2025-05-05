async function saveRecipe(data) {
  try {
    const response = await fetch(
      'https://babbabbook-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();
    console.log('저장 결과:', result);
    alert('레시피가 성공적으로 저장되었습니다!');
    window.location.href = 'home.html';
  } catch (error) {
    console.error('저장 중 오류 발생:', error);
    alert('저장에 실패했습니다. 다시 시도해주세요.');
  }
}

const form = document.getElementById('recipeForm');

form.addEventListener('submit', async function (e) {
  e.preventDefault(); // 폼 기본 제출 막기

  const title = form.title.value;
  const description = form.description.value;
  const category = form.category.value;

  // steps 데이터 수집
  const stepGroups = form.querySelectorAll('.step-group');
  const steps = [];
  stepGroups.forEach((group) => {
    const desc = group.querySelector(
      'textarea[name="stepDescription[]"]'
    ).value;
    steps.push({ description: desc });
  });

  // 최종 데이터 구성
  const recipeData = {
    title,
    description,
    category,
    steps,
  };

  // Firebase로 저장
  await saveRecipe(recipeData);
});
