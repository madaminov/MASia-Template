const dropdownElementList = document.querySelectorAll(
  '.dropdown-toggle-confirm'
);
const dropdownList = [...dropdownElementList].map(
  (dropdownToggleEl) => new bootstrap.Dropdown(dropdownToggleEl)
);

dropdownList.forEach((box) => {
  box['_element'].addEventListener('show.bs.dropdown', (event) => {
    if (box['_element'].value) {
      box['_menu'].querySelectorAll('input[type="checkbox"]').forEach((el) => {
        if (el.value == box['_element'].value) {
          el.checked = true;
          box['_menu'].querySelector('.btn-confirm').disabled = false;
        }
      });
    }
  });
});

const durationPickerCancel = document.querySelectorAll(
  '.duration-picker .btn-cancel'
);
durationPickerCancel.forEach((box) => {
  box.addEventListener('click', (event) => {
    event.preventDefault();
    event.target.closest('.dropdown-menu-confirm').classList.remove('show');
  });
});
const durationPickerConfirm = document.querySelectorAll(
  '.duration-picker .btn-confirm'
);
durationPickerConfirm.forEach((box) => {
  box.addEventListener('click', (event) => {
    event.preventDefault();
    dropdown_menu = event.target.closest('.dropdown-menu-confirm');
    if (dropdown_menu.querySelector('input[type="checkbox"]:checked')) {
      dropdown_menu.previousElementSibling.value = dropdown_menu.querySelector(
        'input[type="checkbox"]:checked'
      ).value;
    } else if (dropdown_menu.querySelector('input[type="text"]').value) {
      dropdown_menu.previousElementSibling.value =
        dropdown_menu.querySelector('input[type="text"]').value;
    }
    dropdown_menu.classList.remove('show');
  });
});
const durationPickerInputCheckbox = document.querySelectorAll(
  '.duration-picker input[type="checkbox"'
);
durationPickerInputCheckbox.forEach((box) => {
  box.addEventListener('change', (event) => {
    duration_picker = event.target.closest('.duration-picker');
    btn_confirm = duration_picker.querySelector('.btn-confirm');
    input_duration_other = duration_picker.querySelector(
      'input[name="duration-other"]'
    );
    duration_picker
      .querySelectorAll('input[type="checkbox"]')
      .forEach((boxElement) => {
        if (event.target != boxElement) {
          boxElement.checked = false;
        }
      });
    if (event.target.checked) {
      btn_confirm.disabled = false;
      input_duration_other.value = '';
    } else {
      if (input_duration_other.value.length > 0) {
        btn_confirm.disabled = false;
      } else {
        btn_confirm.disabled = true;
      }
    }
  });
});

const durationPickerInputText = document.querySelectorAll(
  '.duration-picker input[type="text"]'
);
durationPickerInputText.forEach((box) => {
  box.addEventListener('input', (event) => {
    duration_picker = event.target.closest('.duration-picker');
    btn_confirm = duration_picker.querySelector('.btn-confirm');
    input_duration_checkbox = duration_picker.querySelectorAll(
      'input[type="checkbox"]'
    );
    input_duration_checkbox.forEach((boxElement) => {
      boxElement.checked = false;
      btn_confirm.disabled = true;
    });
    if (box.value.length > 0) {
      btn_confirm.disabled = false;
    }
  });
});
