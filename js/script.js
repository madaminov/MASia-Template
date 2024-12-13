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
wacm = document.querySelector('.modal-context-menu .toggleClose');
if (wacm) {
  wacm.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.modal-context-menu').classList.remove('show');
  });
}
