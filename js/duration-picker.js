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
      seconds = dropdown_menu
        .querySelector('input[type="checkbox"]:checked')
        .getAttribute('data-value-seconds');
      dropdown_menu.previousElementSibling.setAttribute(
        'data-value-seconds',
        seconds
      );      
    } else {
      hours = dropdown_menu.querySelector('.wrap-hours .current').textContent;
      minutes = dropdown_menu.querySelector(
        '.wrap-minutes .current'
      ).textContent;
      dropdown_menu.previousElementSibling.value = `${hours}:${minutes}`;
      seconds = (Number(hours) * 60 + Number(minutes)) * 60;
      dropdown_menu.previousElementSibling.setAttribute(
        'data-value-seconds',
        seconds
      );
    }
    if ((start_time = document.getElementById('start_time'))) {
      start_time_seconds = start_time.getAttribute('data-value-seconds');
      if (start_time.value.length > 0 && Number(start_time_seconds) > 0) {
        step_seconds = Number(seconds) + Number(start_time_seconds);
        step_date = new Date(step_seconds * 1000);
        set_time = [step_date.getUTCHours(), step_date.getUTCMinutes()]
          .map((val) => String(val).padStart(2, '0'))
          .join(':');
        start_time.value = `${hours}:${minutes} - ${set_time}`;
      }
    }
    dropdown_menu.classList.remove('show');
  });
});
const durationPickerInputCheckbox = document.querySelectorAll(
  '.duration-picker input[type="checkbox"]'
);
durationPickerInputCheckbox.forEach((box) => {
  box.addEventListener('change', (event) => {
    duration_picker = event.target.closest('.duration-picker');
    btn_confirm = duration_picker.querySelector('.btn-confirm');

    duration_picker
      .querySelectorAll('input[type="checkbox"]')
      .forEach((boxElement) => {
        if (event.target != boxElement) {
          boxElement.checked = false;
        }
      });
    if (event.target.checked) {
      btn_confirm.disabled = false;
    }
  });
});

//time-picker-duration
const dtsp = document.querySelectorAll('.duration-group-timer');
dtsp.forEach((box) => {
  let currentIndexHours = 0;
  let currentIndexMinutes = 0;

  wh = box.querySelector('.wrap-hours');
  wm = box.querySelector('.wrap-minutes');
  wh_list = wh.querySelector('.list');
  wm_list = wm.querySelector('.list');

  wh_list.innerHTML = '';
  for (i = 0; i < 24; i++) {
    if (i < 10) {
      if (i == 0) {
        wh_list.innerHTML += `<li class="current" data-value="${i}">0${i}</li>`;
      } else {
        wh_list.innerHTML += `<li data-value="${i}">0${i}</li>`;
      }
    } else {
      wh_list.innerHTML += `<li data-value="${i}">${i}</li>`;
    }
  }
  wm_list.innerHTML = '';
  for (i = 0; i < 60; i++) {
    if (i < 10) {
      if (i == 0) {
        wm_list.innerHTML += `<li class="current" data-value="${i}">0${i}</li>`;
      } else {
        wm_list.innerHTML += `<li data-value="${i}">0${i}</li>`;
      }
    } else {
      wm_list.innerHTML += `<li data-value="${i}">${i}</li>`;
    }
  }
  wh_list_li_d = wh_list.querySelectorAll('li');
  wm_list_li_d = wm_list.querySelectorAll('li');

  function showHoursLi(index) {
    wh_list_li_d[currentIndexHours].classList.remove('current');
    wh_list_li_d[index].classList.add('current');
    currentIndexHours = index;
  }

  wh.querySelector('.btn-prev').addEventListener('click', function (event) {
    event.preventDefault();
    let index = currentIndexHours - 1;
    if (index < 0) {
      index = wh_list_li_d.length - 1;
    }
    showHoursLi(index);
  });
  wh.querySelector('.btn-next').addEventListener('click', function (event) {
    console.log(event.target);
    event.preventDefault();
    if (event.target.classList.contains('btn-next')) {
      let index = currentIndexHours + 1;
      if (index >= wh_list_li_d.length) {
        index = 0;
      }
      showHoursLi(index);
    }
  });

  function showMinutesLi(index) {
    wm_list_li_d[currentIndexMinutes].classList.remove('current');
    wm_list_li_d[index].classList.add('current');
    currentIndexMinutes = index;
  }
  wm.querySelector('.btn-prev').addEventListener('click', function (event) {
    event.preventDefault();
    let index = currentIndexMinutes - 1;
    if (index < 0) {
      index = wm_list_li_d.length - 1;
    }
    showMinutesLi(index);
  });
  wm.querySelector('.btn-next').addEventListener('click', function (event) {
    event.preventDefault();
    if (event.target.classList.contains('btn-next')) {
      let index = currentIndexMinutes + 1;
      if (index >= wm_list_li_d.length) {
        index = 0;
      }
      showMinutesLi(index);
    }
  });
});
