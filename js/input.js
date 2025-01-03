let i = 0;
let NiceSelectAll = new Array();
let formSelect = document.querySelectorAll('.form-select');
formSelect.forEach((select) => {
  NiceSelectAll[i] = NiceSelect.bind(select);
  select.addEventListener('change', function (event) {
    if (event.target.value) {
      if (event.target.closest('.input-group')) {
        event.target
          .closest('.input-group')
          .querySelector('.reset-value')
          .classList.add('d-block');
      }
    }
  });
  i++;
});

document.querySelectorAll('.reset-value').forEach((box) => {
  box.addEventListener('click', function (event) {
    form_control = event.target
      .closest('.input-group')
      .querySelector('.form-control');
    if (form_control) {
      form_control.value = '';
    }
    form_select = event.target
      .closest('.input-group')
      .querySelector('.form-select');
    if (form_select) {
      form_select.querySelectorAll('option').forEach((optionBox) => {
        optionBox.selected = false;
      });
      for (i = 0; i < NiceSelectAll.length; i++) {
        if (NiceSelectAll[i]['el'] == form_select) {
          NiceSelectAll[i].update();
        }
      }
    }

    event.target.classList.remove('d-block');
  });
});

let psh = document.querySelectorAll('.password-show-view');
psh.forEach((box) => {
  box.addEventListener('click', function () {
    if (box.previousElementSibling.getAttribute('type') == 'text') {
      box.previousElementSibling.setAttribute('type', 'password');
    } else {
      box.previousElementSibling.setAttribute('type', 'text');
    }
  });
});
const collapseTip = new bootstrap.Collapse('#collapseTip', {
  toggle: false,
});
const dropdownElementList = document.querySelectorAll('.dropdown-toggle');
const dropdownList = [...dropdownElementList].map(
  (dropdownToggleEl) => new bootstrap.Dropdown(dropdownToggleEl)
);

dropdownList.forEach((box) => {
  box['_element'].addEventListener('hidden.bs.dropdown', (event) => {
    event.preventDefault();

    if (event && event.clickEvent && event.clickEvent.target) {
      el_target = event.clickEvent.target;
      if (el_target.classList.contains('dropdown-item')) {
        box['_element'].value =
          event.clickEvent.target.getAttribute('data-value');
        collapseTip.show();
      } else {
        if (box['_menu'].querySelector('input').value) {
          box['_element'].value = box['_menu'].querySelector('input').value;
          box['_menu'].querySelector('input').value = '';
        }
        collapseTip.hide();
      }

      event.clickEvent.preventDefault();
    }
  });
});

let input_password = document.querySelectorAll('.form-control-password');
input_password.forEach((box) => {
  box.addEventListener('input', (event) => {
    let ratting = 0;
    id_el = event.target.getAttribute('id');
    validation_element = document.getElementById('validation' + id_el);
    error_validation = validation_element.querySelectorAll('.error-validation');
    wrap_progress = validation_element.querySelector('.wrap-progress');
    if (event.target.value.length > 0) {
      validation_element.classList.remove('visually-hidden');
      error_validation.forEach((ervalidation) => {
        ervalidation.classList.remove('visually-hidden');
      });
      wrap_progress.classList.remove('visually-hidden');
    }
    if (event.target.value.length > 7) {
      validation_element
        .querySelector('.validation-characters')
        .classList.add('check');
      ratting++;
    } else {
      validation_element
        .querySelector('.validation-characters')
        .classList.remove('check');
    }
    if (event.target.value.match(/[0-9]/g)) {
      validation_element
        .querySelector('.validation-number')
        .classList.add('check');
      ratting++;
    } else {
      validation_element
        .querySelector('.validation-number')
        .classList.remove('check');
    }
    if (event.target.value.match(/[a-z]/g)) {
      validation_element
        .querySelector('.validation-symbol')
        .classList.add('check');
      ratting++;
    } else {
      validation_element
        .querySelector('.validation-symbol')
        .classList.remove('check');
    }
    if (ratting == 0) {
      validation_element.querySelector('.progress-bar').style.width = '0%';
    } else if (ratting == 1) {
      validation_element.querySelector('.progress-bar').style.width = '33%';
    } else if (ratting == 2) {
      validation_element.querySelector('.progress-bar').style.width = '66%';
    } else if (ratting == 3) {
      validation_element.querySelector('.progress-bar').style.width = '100%';
    }
  });
  box.addEventListener('change', (event) => {
    let checkPassword = true;
    id_el = event.target.getAttribute('id');
    validation_element = document.getElementById('validation' + id_el);
    error_validation = validation_element.querySelectorAll('.error-validation');
    wrap_progress = validation_element.querySelector('.wrap-progress');
    if (event.target.value.length < 8) {
      checkPassword = false;
    }
    if (!event.target.value.match(/[0-9]/g)) {
      checkPassword = false;
    }
    if (!event.target.value.match(/[a-z]/g)) {
      checkPassword = false;
    }
    if (checkPassword) {
      validation_element.classList.add('visually-hidden');
      wrap_progress.classList.add('visually-hidden');
      error_validation.forEach((ervalidation) => {
        ervalidation.classList.add('visually-hidden');
      });
    } else {
      wrap_progress.classList.add('visually-hidden');
      error_validation.forEach((ervalidation) => {
        ervalidation.classList.add('visually-hidden');
      });
    }
  });
  // box.addEventListener('focusout', (event) => {
  //   id_el = event.target.getAttribute('id');
  //   validation_element = document.getElementById('validation' + id_el);
  //   validation_element.classList.remove('show');
  // });
});
