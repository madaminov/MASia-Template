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
const elem = document.getElementById('calendar');
const datepicker = new Datepicker(elem, {
  todayHighlight: true,
  weekStart: 1,
  maxNumberOfDates: 2,
  beforeShowDay(date) {
    if (date.getMonth() == new Date().getMonth()) {
      switch (date.getDate()) {
        case 4:
          return {
            classes: 'color-violet border-color-violet',
          };
        case 8:
          return { classes: 'color-blue border-color-blue' };
        case 12:
          return { classes: 'color-pink bg-color-pink border-color-pink' };
        case 15:
          return { classes: 'color-pink bg-color-pink border-color-pink' };
        case 21:
          return {
            classes: 'color-violet border-color-violet',
          };
      }
    }
  },
});
//datepicker.getFocusedDate('19/11/2024');
btn_close_windowAttach = document.querySelector(
  '.window-attach .btn-close-windowAttach'
);
if (btn_close_windowAttach) {
  btn_close_windowAttach.addEventListener('click', (e) => {
    document.querySelector('.window-attach').classList.remove('show');
  });
}
