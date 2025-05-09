const stepsContainer = document.querySelector('.steps-container');
const addStepBtn = document.querySelector('.add-step-btn');
let stepCount = 1;

addStepBtn.addEventListener('click', function () {
  stepCount++;
  const newStep = document.createElement('div');
  newStep.className = 'step-group';
  newStep.dataset.step = stepCount;
  newStep.innerHTML = `
      <div class="step-header">
        <h4>단계 ${stepCount}</h4>
        <button type="button" class="remove-step-btn">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="form-group">
        <label>이미지</label>
        <div class="image-upload">
          <input type="file" name="stepImage[]" accept="image/*" required />
          <div class="upload-preview">
            <i class="fas fa-cloud-upload-alt"></i>
            <p>단계별 이미지를 선택하세요</p>
          </div>
        </div>
      </div>
      <div class="form-group">
        <label>설명</label>
        <textarea name="stepDescription[]" placeholder="이 단계에 대한 설명을 입력하세요" required></textarea>
      </div>
    `;
  stepsContainer.appendChild(newStep);

  stepsContainer.addEventListener('click', function (e) {
    if (e.target.closest('.remove-step-btn')) {
      const stepGroup = e.target.closest('.step-group');
      if (document.querySelectorAll('.step-group').length > 1) {
        stepGroup.remove();
        // 단계 번호 재정렬
        document.querySelectorAll('.step-group').forEach((group, index) => {
          group.dataset.step = index + 1;
          group.querySelector('h4').textContent = `단계 ${index + 1}`;
        });
      }
    }
  });
});

const mainImageInput = document.getElementById('mainImage');
const mainImagePreview = document.querySelector('.main-image .upload-preview');

mainImageInput.addEventListener('change', function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      mainImagePreview.innerHTML = `<img src="${e.target.result}" alt="대표 이미지 미리보기">`;
    };
    reader.readAsDataURL(file);
  }
});

stepsContainer.addEventListener('change', function (e) {
  if (e.target.name === 'stepImage[]') {
    const file = e.target.files[0];
    const preview = e.target
      .closest('.image-upload')
      .querySelector('.upload-preview');

    if (file) {
      const reader = new FileReader();
      reader.onload = function (ev) {
        preview.innerHTML = `<img src="${ev.target.result}" alt="미리보기">`;
      };
      reader.readAsDataURL(file);
    }
  }
});
