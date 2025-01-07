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
        wh_list.innerHTML += '<li class="current">0' + i + '</li>';
      } else {
        wh_list.innerHTML += '<li>0' + i + '</li>';
      }
    } else {
      wh_list.innerHTML += '<li>' + i + '</li>';
    }
  }
  wm_list.innerHTML = '';
  for (i = 0; i < 60; i++) {
    if (i < 10) {
      if (i == 0) {
        wm_list.innerHTML += '<li class="current">0' + i + '</li>';
      } else {
        wm_list.innerHTML += '<li>0' + i + '</li>';
      }
    } else {
      wm_list.innerHTML += '<li>' + i + '</li>';
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
    box.closest(
      '.dropdown-menu-time-picker'
    ).previousElementSibling.value = `${hours}:${minutes}`;
    box.closest('.dropdown-menu-time-picker').classList.remove('show');
    box
      .closest('.input-group')
      .querySelector('.reset-value')
      .classList.add('d-block');
  });
});
