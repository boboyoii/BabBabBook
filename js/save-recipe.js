async function uploadImage(file, folder) {
  const fileRef = ref(storage, `${folder}/${Date.now()}_${file.name}`);
  await uploadBytes(fileRef, file);
  return await getDownloadURL(fileRef);
}

async function saveRecipe(data) {
  try {
    const response = await fetch(
      'http://localhost:3000/api/recipes/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );

    if(response.ok){
      const savedRecipe = await response.json();
      alert('레시피가 성공적으로 저장되었습니다!');
      window.location.href = `recipe-detail.html?id=${savedRecipe._id}`;
    }
    
  } catch (error) {
    alert('저장에 실패했습니다. 다시 시도해주세요.');
  }
}

const form = document.getElementById('recipeForm');

form.addEventListener('submit', async function (e) {
  e.preventDefault(); // 폼 기본 제출 막기

  const title = form.title.value;
  const description = form.description.value;
  const category = form.category.value;

  const mainImageFile = form.mainImage.files[0];
  const mainImage = null;

  // steps 데이터 수집
  const stepGroups = form.querySelectorAll('.step-group');
  const steps = [];
  for (const group of stepGroups) {
    const desc = group.querySelector(
      'textarea[name="stepDescription[]"]'
    ).value;
    const imgFile = group.querySelector('input[name="stepImage[]"]').files[0];
    const imgUrl = null;
    steps.push({ description: desc, image: imgUrl });
  }

  // 최종 데이터 구성
  const recipeData = {
    title,
    description,
    category,
    mainImage,
    steps,
  };

  // Firebase로 저장
  await saveRecipe(recipeData);
});
