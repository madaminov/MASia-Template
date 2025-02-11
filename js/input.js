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
          .querySelector('.input-reset-value')
          .classList.add('d-block');
      }
    }
  });
  ns_length++;
});

document.querySelectorAll('.input-reset-value').forEach((box) => {
  box.addEventListener('click', function (event) {
    console.log(event.target);
    form_control_input = event.target
      .closest('.input-group')
      .querySelector('.form-control');
    if (form_control_input) {
      form_control_input.value = '';
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
          box['_element'].classList.remove('is-invalid');
          //collapseTip.show();
        } else {
          if (box['_menu'].querySelector('input').value) {
            box['_element'].value = box['_menu'].querySelector('input').value;
            box['_menu'].querySelector('input').value = '';
          }
          //collapseTip.hide();
        }

        event.clickEvent.preventDefault();
      }
    });
  });
}

//dropdown-assignee
if (document.querySelectorAll('.dropdown-assignee')) {
  const dropdownElementListAssignee =
    document.querySelectorAll('.dropdown-assignee');
  const dropdownListAssignee = [...dropdownElementListAssignee].map(
    (dropdownToggleElAssignee) =>
      new bootstrap.Dropdown(dropdownToggleElAssignee)
  );
  dropdownListAssignee.forEach((box) => {
    box_input = box['_element'].querySelector('input');
    box['_element'].addEventListener('show.bs.dropdown', (event) => {
      id_assignee = box_input.value;
      box['_menu'].querySelectorAll('.dropdown-item').forEach((item) => {
        if (item.getAttribute('data-id') == id_assignee) {
          item.classList.add('selected');
        }
      });
    });
    box['_element'].addEventListener('hidden.bs.dropdown', (event) => {
      event.preventDefault();
      if (event && event.clickEvent && event.clickEvent.target) {
        el_target = event.clickEvent.target;
        if (el_target.classList.contains('dropdown-item')) {
          assignee_id = event.clickEvent.target.getAttribute('data-id');
          assignee_name = event.clickEvent.target.getAttribute('data-value');
          assignee_avatar = event.clickEvent.target.getAttribute('data-avatar');
          box_input.value = `${assignee_id}`;
          box['_element'].querySelector('.name').textContent = assignee_name;
          if (assignee_avatar) {
            avatar = document.createElement('img');
            avatar.setAttribute('src', assignee_avatar);
            avatar.setAttribute('alt', assignee_name);
            avatar.classList.add('img-fluid');
            box['_element'].querySelector('.person').innerHTML = '';
            box['_element'].querySelector('.person').appendChild(avatar);
          } else {
            box['_element'].querySelector('.person').innerHTML = '';
          }

          box['_menu'].querySelectorAll('.dropdown-item').forEach((item) => {
            item.classList.remove('selected');
          });
          el_target.classList.add('selected');
        }
        event.clickEvent.preventDefault();
      }
    });
  });
}
// end dropdown-assignee

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
    reviewer_type = event.target.getAttribute('data-reviewer-type');
    // if (reviewer_id == 1) {
    //   event.target.checked = true;
    //   return false;
    // }
    if (event.target.checked) {
      template = `<div class="item item-width-full animated fadeIn ${reviewer_type}" data-reviewer-id="${reviewer_id}">
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
        document
          .querySelector('.members-list-reviewer')
          .insertAdjacentHTML('afterBegin', template);
        //document.querySelector('.members-list-reviewer').innerHTML = template;
      }
      const dropdownElementListReviewer =
        document.querySelectorAll('.dropdown-reviewer');
      const dropdownListReviewer = [...dropdownElementListReviewer].map(
        (dropdownToggleElReviewer) =>
          new bootstrap.Dropdown(dropdownToggleElReviewer)
      );
      dropdownListReviewer.forEach((box) => {
        box.hide();
        box.show();
      });
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
function autoResize(textarea) {
  textarea.style.height = 'auto';
  textarea.style.height = textarea.scrollHeight + 'px';
}
