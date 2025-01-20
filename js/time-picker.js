const dropdownElementTimePicker = document.querySelectorAll(
  '.dropdown-toggle-time-picker'
);
const dropdownTimePicker = [...dropdownElementTimePicker].map(
  (dropdownToggleElTimePicker) =>
    new bootstrap.Dropdown(dropdownToggleElTimePicker)
);

dropdownTimePicker.forEach((box) => {
  box['_element'].addEventListener('show.bs.dropdown', (event) => {
    if (
      (select_category = document.querySelector(
        '.form-create-event select[name="category"]'
      ))
    ) {
      if (select_category.value == 'Birthday') {
        box['_menu'].querySelector('.wrap-all-day').classList.remove('d-none');
      } else {
        box['_menu'].querySelector('.wrap-all-day').classList.add('d-none');
      }
    }
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
const tsp = document.querySelectorAll('.time-start-picker');
tsp.forEach((box) => {
  let currentIndexHours = 0;
  let currentIndexMinutes = 0;

  wh = box.querySelector('.wrap-hours');
  wm = box.querySelector('.wrap-minutes');
  wh_list = wh.querySelector('.list');
  wm_list = wm.querySelector('.list');
  reset = box.querySelector('.reset');
  wh_list.innerHTML = '';
  for (i = 0; i < 24; i++) {
    if (i < 10) {
      if (i == 0) {
        wh_list.innerHTML +=
          '<li class="current" data-value="' + i + '">0' + i + '</li>';
      } else {
        wh_list.innerHTML += '<li data-value="' + i + '">0' + i + '</li>';
      }
    } else {
      wh_list.innerHTML += '<li data-value="' + i + '">' + i + '</li>';
    }
  }
  wm_list.innerHTML = '';
  for (i = 0; i < 60; i++) {
    if (i < 10) {
      if (i == 0) {
        wm_list.innerHTML +=
          '<li class="current" data-value="' + i + '">0' + i + '</li>';
      } else {
        wm_list.innerHTML += '<li data-value="' + i + '">0' + i + '</li>';
      }
    } else {
      wm_list.innerHTML += '<li data-value="' + i + '">' + i + '</li>';
    }
  }
  wh_list_li = wh_list.querySelectorAll('li');
  wm_list_li = wm_list.querySelectorAll('li');

  function showHoursLi(index) {
    wh_list_li[currentIndexHours].classList.remove('current');
    wh_list_li[index].classList.add('current');
    currentIndexHours = index;
  }

  wh.querySelector('.btn-prev').addEventListener('click', function (event) {
    event.preventDefault();
    let index = currentIndexHours - 1;
    if (index < 0) {
      index = wh_list_li.length - 1;
    }
    showHoursLi(index);
  });
  wh.querySelector('.btn-next').addEventListener('click', function (event) {
    event.preventDefault();
    if (event.target.classList.contains('btn-next')) {
      let index = currentIndexHours + 1;
      if (index >= wh_list_li.length) {
        index = 0;
      }
      showHoursLi(index);
    }
  });

  function showMinutesLi(index) {
    wm_list_li[currentIndexMinutes].classList.remove('current');
    wm_list_li[index].classList.add('current');
    currentIndexMinutes = index;
  }
  wm.querySelector('.btn-prev').addEventListener('click', function (event) {
    event.preventDefault();
    let index = currentIndexMinutes - 1;
    if (index < 0) {
      index = wm_list_li.length - 1;
    }
    showMinutesLi(index);
  });
  wm.querySelector('.btn-next').addEventListener('click', function (event) {
    event.preventDefault();
    if (event.target.classList.contains('btn-next')) {
      let index = currentIndexMinutes + 1;
      if (index >= wm_list_li.length) {
        index = 0;
      }
      showMinutesLi(index);
    }
  });
  reset.addEventListener('click', function (event) {
    event.preventDefault();
    // currentIndexMinutes = 0;
    // currentIndexHours = 0;
    index = 0;
    showMinutesLi(index);
    showHoursLi(index);
  });
  box.querySelector('.btn-cancel').addEventListener('click', function (event) {
    event.preventDefault();
    box.closest('.dropdown-menu-time-picker').classList.remove('show');
  });
  box.querySelector('.btn-confirm').addEventListener('click', function (event) {
    event.preventDefault();
    hours = wh_list.querySelector('.current').textContent;
    minutes = wm_list.querySelector('.current').textContent;
    input_time_picker = box.closest(
      '.dropdown-menu-time-picker'
    ).previousElementSibling;
    input_time_picker.value = `${hours}:${minutes}`;

    hours_set = wh_list.querySelector('.current').getAttribute('data-value');
    minutes_set = wm_list.querySelector('.current').getAttribute('data-value');

    seconds = (Number(hours_set) * 60 + Number(minutes_set)) * 60;

    input_time_picker.setAttribute('data-value-seconds', seconds);
    box.closest('.dropdown-menu-time-picker').previousElementSibling;
    box.closest('.dropdown-menu-time-picker').classList.remove('show');
    box
      .closest('.input-group')
      .querySelector('.input-reset-value')
      .classList.add('d-block');
    if (input_time_picker.getAttribute('data-set-duration')) {
      if ((input_duration = document.getElementById('duration'))) {
        duration_seconds = input_duration.getAttribute('data-value-seconds');
        step_seconds = seconds + Number(duration_seconds);

        const step_date = new Date(step_seconds * 1000);
        set_time = [step_date.getUTCHours(), step_date.getUTCMinutes()]
          .map((val) => String(val).padStart(2, '0'))
          .join(':');

        input_time_picker.value = `${hours}:${minutes} - ${set_time}`;
      }
    }
    if (box.querySelector('.form-check-input').checked) {
      input_time_picker.value = 'All day';
      input_time_picker.setAttribute('data-value-seconds', 0);
    }
  });
});
