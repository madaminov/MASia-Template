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
