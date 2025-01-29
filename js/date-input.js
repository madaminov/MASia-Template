﻿let localeEn = {
  days: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ],
  daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  daysMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  months: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  monthsShort: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
  today: 'Today',
  clear: 'Clear',
  dateFormat: 'dd MMMM, EEEE',
  timeFormat: 'hh:mm aa',
  firstDay: 1,
};
document.querySelectorAll('.form-control-date').forEach((box) => {
  box.addEventListener('click', (event) => {
    if (event.target.classList.contains('form-control-open-calendar')) {
      datepickerCalendar.destroy();
      event.target.classList.remove('form-control-open-calendar');
    } else {
      event.target.classList.add('form-control-open-calendar');
      datepickerCalendar = new AirDatepicker(event.target, {
        locale: localeEn,
        inline: true,
        navTitles: {
          days: 'MMMM <div>yyyy</div>',
          months: 'yyyy',
          years: 'yyyy1 - yyyy2',
        },
        onSelect({ date, formattedDate, datepicker }) {
          datepickerCalendar.destroy();
          event.target.classList.remove('form-control-open-calendar');
          console.log(event.target);
          event.target.nextElementSibling.classList.add('d-block');
          event.target.classList.remove('is-invalid');
        },
      });
    }
  });
});
