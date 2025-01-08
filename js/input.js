let ns_length = 0;
let NiceSelectAll = new Array();
let formSelect = document.querySelectorAll('.form-select');
formSelect.forEach((select) => {
  NiceSelectAll[ns_length] = NiceSelect.bind(select);
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
  ns_length++;
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
let collapseTip = '';
if (document.getElementById('collapseTip')) {
  collapseTip = new bootstrap.Collapse('#collapseTip', {
    toggle: false,
  });
}

if (document.querySelectorAll('.dropdown-toggle')) {
  const dropdownElementList = document.querySelectorAll('.dropdown-toggle');
  const dropdownList = [...dropdownElementList].map(
    (dropdownToggleEl) => new bootstrap.Dropdown(dropdownToggleEl)
  );
  dropdownList.forEach((box) => {
    box['_menu']
      .querySelector('input')
      .addEventListener('keypress', function (e) {
        var key = e.which || e.keyCode;
        if (key === 13) {
          box['_element'].value = box['_menu'].querySelector('input').value;
          box.hide();
        }
      });
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
}

if (document.querySelectorAll('.dropdown-assignee')) {
  const dropdownElementListAssignee =
    document.querySelectorAll('.dropdown-assignee');
  const dropdownListAssignee = [...dropdownElementListAssignee].map(
    (dropdownToggleElAssignee) =>
      new bootstrap.Dropdown(dropdownToggleElAssignee)
  );
  dropdownListAssignee.forEach((box) => {
    box['_element'].addEventListener('hidden.bs.dropdown', (event) => {
      event.preventDefault();

      if (event && event.clickEvent && event.clickEvent.target) {
        el_target = event.clickEvent.target;
        if (el_target.classList.contains('dropdown-item')) {
          assignee_name = event.clickEvent.target.getAttribute('data-value');
          assignee_avatar = event.clickEvent.target.getAttribute('data-avatar');
          box['_element']
            .closest('.wrap-choice-assignee')
            .classList.add('visually-hidden');
          members_list = document.querySelector('.members-list');
          members_list.querySelector('input[name="person"]').value =
            'person[' + assignee_name + ']';
          members_list.querySelector('.name').textContent = assignee_name;
          if (assignee_avatar) {
            avatar = document.createElement('img');
            avatar.setAttribute('src', assignee_avatar);
            avatar.setAttribute('alt', assignee_name);
            avatar.classList.add('img-fluid');
            members_list.querySelector('.person').innerHTML = '';
            members_list.querySelector('.person').appendChild(avatar);
          } else {
            members_list.querySelector('.person').innerHTML = '';
          }
          members_list.classList.remove('visually-hidden');
          // console.log(box['_element']);
        }

        event.clickEvent.preventDefault();
      }
    });
  });
}
if (document.querySelector('.members-list .btn-remove-assignee')) {
  document
    .querySelector('.members-list .btn-remove-assignee')
    .addEventListener('click', (event) => {
      event.preventDefault();
      event.target.closest('.members-list').classList.add('visually-hidden');
      document
        .querySelector('.wrap-choice-assignee')
        .classList.remove('visually-hidden');
    });
}

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
});
if (document.querySelectorAll('.dropdown-reviewer')) {
  const dropdownElementListReviewer =
    document.querySelectorAll('.dropdown-reviewer');
  const dropdownListReviewer = [...dropdownElementListReviewer].map(
    (dropdownToggleElReviewer) =>
      new bootstrap.Dropdown(dropdownToggleElReviewer)
  );
  dropdownListReviewer.forEach((box) => {
    box['_element'].addEventListener('show.bs.dropdown', (event) => {
      //event.preventDefault();
      console.log(box['_menu']);
      document
        .querySelectorAll('.members-list-reviewer .item')
        .forEach((mlr_item) => {
          box['_menu']
            .querySelectorAll('.form-check-input')
            .forEach((form_check_input) => {
              if (
                form_check_input.getAttribute('data-reviewer-id') ==
                mlr_item.getAttribute('data-reviewer-id')
              ) {
                form_check_input.checked = true;
              }
            });
        });
    });
  });
}
document.querySelectorAll('.dropdown-list-reviewer input').forEach((box) => {
  box.addEventListener('change', (event) => {
    value = event.target.value;
    avatar = event.target.getAttribute('data-avatar');
    data_name = event.target.getAttribute('data-name');
    reviewer_id = event.target.getAttribute('data-reviewer-id');
    if (reviewer_id == 1) {
      event.target.checked = true;
      return false;
    }
    if (event.target.checked) {
      template = `<div class="item item-width-full animated fadeIn" data-reviewer-id="${reviewer_id}">
											<input type="hidden" name="reviewer[${value}]">
											<div class="person">
												<img src="${avatar}" alt="${data_name}" class="img-fluid">
											</div>
											<div class="name">${data_name}</div>
                      <button class="btn-close btn-close-gray" onclick="updateDropdownListReviewer(this);return false"></button>
										</div>`;
      if (
        document.querySelectorAll('.members-list-reviewer .item').length > 0
      ) {
        item = document.querySelectorAll('.members-list-reviewer .item');
        item[item.length - 1].insertAdjacentHTML('afterEnd', template);
      } else {
        document.querySelector('.members-list-reviewer').prepend(template);
      }
      //document.querySelector('.members-list-reviewer').innerHTML = template;
    } else {
      document
        .querySelector(
          '.members-list-reviewer .item[data-reviewer-id="' + reviewer_id + '"]'
        )
        .remove();
    }
  });
});
function updateDropdownListReviewer(event) {
  // event.preventDefault();
  console.log(event);
  item = event.closest('.item');
  id = item.getAttribute('data-reviewer-id');
  document
    .querySelectorAll('.dropdown-list-reviewer .form-check-input')
    .forEach((form_check_input) => {
      if (form_check_input.getAttribute('data-reviewer-id') == id) {
        form_check_input.checked = false;
      }
      item.remove();
    });
}
if (document.querySelectorAll('.dropdown-tag')) {
  const dropdownElementListTag = document.querySelectorAll('.dropdown-tag');
  const dropdownListTag = [...dropdownElementListTag].map(
    (dropdownToggleElTag) => new bootstrap.Dropdown(dropdownToggleElTag)
  );
  dropdownListTag.forEach((box) => {
    box['_element'].addEventListener('shown.bs.dropdown', (event) => {
      element_show = box['_element'];
      //event.preventDefault();
      setTimeout(() => {
        tags = box['_element'].closest('.tags');
        tags.classList.add('show');
        tags.querySelector('.toggleClose').classList.add('show');
        document.querySelector('.fullModal').style.zIndex = '1057';
      }, 50);
    });
    box['_element'].addEventListener('hide.bs.dropdown', (event) => {
      console.log('hide.bs.dropdown');
      dropdownListTag.forEach((otherBox) => {
        if (
          otherBox['_element'] != box['_element'] &&
          !otherBox['_element'].classList.contains('show')
        ) {
          tags = box['_element'].closest('.tags');
          tags.querySelector('.toggleClose').classList.remove('show');
          setTimeout(() => {
            tags.classList.remove('show');
          }, 400);

          document.querySelector('.fullModal').style.zIndex = '';
        }
      });
    });
    box['_element'].addEventListener('hidden.bs.dropdown', (event) => {
      //event.preventDefault();
      console.log('hidden.bs.dropdown');
      if (event && event.clickEvent && event.clickEvent.target) {
        el_target = event.clickEvent.target;
        if (el_target.classList.contains('dropdown-item')) {
          box['_element'].value =
            event.clickEvent.target.getAttribute('data-value');
          box['_element'].textContent =
            event.clickEvent.target.getAttribute('data-value');
        }
      }
    });
  });
}
