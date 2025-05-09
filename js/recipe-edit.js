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

async function fillRecipeForm(recipeId) {
  try {
    const response = await fetch(
      `https://babbabbook-default-rtdb.asia-southeast1.firebasedatabase.app/recipes/${recipeId}.json`
    );
    const recipe = await response.json();

    if (!recipe) {
      alert('레시피 데이터를 불러오지 못했습니다.');
      return;
    }

    document.querySelector('#title').value = recipe.title || '';
    document.querySelector('#description').value = recipe.description || '';
    document.querySelector('#category').value = recipe.category || '';

    const mainImagePreview = document.querySelector(
      '.main-image .upload-preview'
    );
    if (recipe.mainImage) {
      mainImagePreview.innerHTML = `<img src="${recipe.mainImage}" alt="대표 이미지" />`;
      mainImageInput.required = false;
    }

    const stepsContainer = document.querySelector('.steps-container');
    stepsContainer.innerHTML = '<h3>조리 단계</h3>'; // 기존 폼 초기화

    recipe.steps.forEach((step, index) => {
      const stepGroup = document.createElement('div');
      stepGroup.className = 'step-group';
      stepGroup.setAttribute('data-step', index + 1);

      const showRemoveBtn =
        recipe.steps.length > 1 ? '' : 'style="display:none"';

      stepGroup.innerHTML = `
        <div class="step-header">
          <h4>단계 ${index + 1}</h4>
          <button type="button" class="remove-step-btn" ${showRemoveBtn}>
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="form-group">
          <label>이미지</label>
          <div class="image-upload">
            <input type="file" name="stepImage[]" accept="image/*" />
            <div class="upload-preview">
              ${
                step.image
                  ? `<img src="${step.image}" alt="단계 이미지"/>`
                  : `<i class="fas fa-cloud-upload-alt"></i><p>단계별 이미지를 선택하세요</p>`
              }
            </div>
          </div>
        </div>
        <div class="form-group">
          <label>설명</label>
          <textarea name="stepDescription[]" placeholder="이 단계에 대한 설명을 입력하세요" required>${
            step.description || ''
          }</textarea>
        </div>
      `;
      stepsContainer.appendChild(stepGroup);

      const input = stepGroup.querySelector('input[name="stepImage[]"]');
      if (step.image) {
        input.required = false;
      }
    });

    return recipe;
  } catch (error) {
    console.error('레시피 불러오기 실패:', error);
    alert('레시피 데이터를 불러오는 중 오류가 발생했습니다.');
  }
}

async function updateRecipe(recipeId, updatedData) {
  try {
    const response = await fetch(
      `https://babbabbook-default-rtdb.asia-southeast1.firebasedatabase.app/recipes/${recipeId}.json`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      }
    );

    if (response.ok) {
      alert('레시피 수정 완료!');
      window.location.href = `recipe-detail.html?id=${recipeId}`; // 상세페이지로 이동
    } else {
      const errorText = await response.text();
      alert('수정 실패: ' + errorText);
    }
  } catch (error) {
    console.error('수정 중 오류 발생:', error);
    alert('수정 중 오류가 발생했습니다.');
  }
}

async function editRecipe() {
  const params = new URLSearchParams(window.location.search);
  const recipeId = params.get('id');

  if (!recipeId) {
    alert('레시피 ID가 없습니다!');
    return;
  }

  const recipe = await fillRecipeForm(recipeId);

  const form = document.getElementById('recipeForm');

  form.addEventListener('submit', async function (e) {
    e.preventDefault(); // 폼 기본 제출 막기

    const title = form.title.value;
    const description = form.description.value;
    const category = form.category.value;

    const mainImageFile = form.mainImage.files[0];
    let mainImage = recipe.mainImage;
    if (mainImageFile) {
      mainImage = await uploadImage(mainImageFile, 'mainImages');
    }

    // steps 데이터 수집
    const stepGroups = form.querySelectorAll('.step-group');
    const steps = [];
    for (let i = 0; i < stepGroups.length; i++) {
      const group = stepGroups[i];
      const desc = group.querySelector(
        'textarea[name="stepDescription[]"]'
      ).value;
      const imgFile = group.querySelector('input[name="stepImage[]"]').files[0];
      let imgUrl = recipe.steps?.[i]?.image || null;

      if (imgFile) {
        imgUrl = await uploadImage(imgFile, 'stepImages');
      }

      steps.push({ description: desc, image: imgUrl });
    }

    const updatedData = {
      title,
      description,
      category,
      mainImage,
      steps,
    };

    await updateRecipe(recipeId, updatedData);
  });
}

editRecipe();
