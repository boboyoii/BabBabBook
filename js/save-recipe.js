async function saveRecipe(data) {
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
}

// 테스트용 데이터
const testData = {
  title: '테스트 레시피',
  description: '이건 테스트용입니다',
  category: 'korean',
  steps: [{ description: '테스트 단계 1' }, { description: '테스트 단계 2' }],
};

// 페이지 로드될 때 바로 POST 실행
document.addEventListener('DOMContentLoaded', function () {
  saveRecipe(testData);
});
