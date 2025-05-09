import { storage } from './firebase-init.js';
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-storage.js';

async function uploadImage(file, folder) {
  const fileRef = ref(storage, `${folder}/${Date.now()}_${file.name}`);
  await uploadBytes(fileRef, file);
  return await getDownloadURL(fileRef);
}

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

  const mainImageFile = form.mainImage.files[0];
  const mainImageUrl = await uploadImage(mainImageFile, 'mainImages');

  // steps 데이터 수집
  const stepGroups = form.querySelectorAll('.step-group');
  const steps = [];
  for (const group of stepGroups) {
    const desc = group.querySelector(
      'textarea[name="stepDescription[]"]'
    ).value;
    const imgFile = group.querySelector('input[name="stepImage[]"]').files[0];
    const imgUrl = await uploadImage(imgFile, 'stepImages');
    steps.push({ description: desc, imageUrl: imgUrl });
  }

  // 최종 데이터 구성
  const recipeData = {
    title,
    description,
    category,
    mainImageUrl,
    steps,
  };

  // Firebase로 저장
  await saveRecipe(recipeData);
});
