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
