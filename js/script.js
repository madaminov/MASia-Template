if (document.querySelector('.switch_view_calendar')) {
  document
    .querySelector('.switch_view_calendar')
    .addEventListener('click', (e) => {
      wrap_calendar = document.querySelector('.wrap-calendar');
      if (wrap_calendar.classList.contains('open')) {
        wrap_calendar.classList.remove('open');
      } else {
        wrap_calendar.classList.add('open');
      }
    });
}

btn_close_windowAttach = document.querySelector(
  '.window-attach .btn-close-windowAttach'
);
if (btn_close_windowAttach) {
  btn_close_windowAttach.addEventListener('click', (e) => {
    document.querySelector('.window-attach').classList.remove('show');
    document.querySelector('body').classList.remove('overflow-hidden');
  });
}
btn_options = document.querySelector('.modal .btn-options');
if (btn_options) {
  btn_options.addEventListener('click', (e) => {
    document.querySelector('.modal-context-menu').classList.add('show');
  });
}
wacm = document.querySelector('.modal-context-menu');
if (wacm) {
  wacm.addEventListener('click', (e) => {
    e.preventDefault();
    wacm.classList.remove('show');
  });
}
