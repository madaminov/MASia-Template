//для вызова событий календаря
let datepickerCalendar = '';
document.addEventListener('DOMContentLoaded', function () {
  setTimeout(function () {
    let currentDates = [];
    var localeEn = {
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
      dateFormat: 'yyyy-MM-dd',
      timeFormat: 'hh:mm aa',
      firstDay: 1,
    };

    datepickerCalendar = new AirDatepicker('#calendar', {
      locale: localeEn,
      inline: true,
      range: true,
      multipleDatesSeparator: ',',
      toggleSelected: true,
      multipleDates: true,
      dynamicRange: false,
      navTitles: {
        days: 'MMMM <div>yyyy</div>',
        months: 'yyyy',
        years: 'yyyy1 - yyyy2',
      },
      // onBeforeSelect({ date, datepicker }) {
      //   console.log(date);
      //   return true;
      // },
      onSelect({ date, formattedDate, datepicker }) {
        if (formattedDate.length > 1) {
          currentDates = formattedDate;
        }
        if (formattedDate.length == 1 && currentDates.length > 1) {
          find_index = currentDates.indexOf(formattedDate[0]);
          if (find_index >= 0) {
            //значит есть такая дата в currentDates
            if (find_index == 0) {
              datepickerCalendar.selectDate(currentDates[1]);
              datepickerCalendar.unselectDate(currentDates[0]);
            } else {
              datepickerCalendar.selectDate(currentDates[0]);
              datepickerCalendar.unselectDate(currentDates[1]);
            }
            currentDates = '';
          } else {
            //нет такой даты в currentDates - удаляем из selectDate
            datepickerCalendar.unselectDate(currentDates[0]);
            datepickerCalendar.unselectDate(currentDates[1]);
            //datepickerCalendar.selectDate(formattedDate[0]);
            //datepickerCalendar.selectDate(formattedDate[0], { silent: true });
            currentDates = formattedDate;
          }
        }

        if (date.length >= 2) {
          let dateFrom = datepicker.rangeDateFrom.getDate();
          let dateMothFrom = datepicker.rangeDateFrom.getMonth();
          let dateYearFrom = datepicker.rangeDateFrom.getFullYear();
          day = datepicker.$datepicker.querySelector(
            '.-days- div[data-date="' +
              dateFrom +
              '"][data-month="' +
              dateMothFrom +
              '"][data-year="' +
              dateYearFrom +
              '"]'
          );
        } else {
          datepicker.$datepicker
            .querySelectorAll('.-days- div')
            .forEach((box) => {
              box.classList.remove('-in-range-', '-range-from-', '-range-to-');
            });
        }
        dispatchEvent(
          new CustomEvent('calendarDateUpdated', { detail: formattedDate })
        );
      },
    });
    //datepickerCalendar.clear(); Очищает все выбранные даты.
    //datepickerCalendar.selectDate(date | date[], opts?);Выбирает одну или сразу несколько дат, если передать массив. пример datepickerCalendar.selectDate('2024-12-12');
    document
      .querySelector('.switch_view_calendar')
      .addEventListener('click', (e) => {
        wrap_calendar = document.querySelector('.wrap-calendar');
        if (wrap_calendar.classList.contains('open')) {
          wrap_calendar.classList.remove('open');
          weekPicker();
        } else {
          wrap_calendar.classList.add('open');
          document.querySelectorAll('.-days- .-day-').forEach((box) => {
            box.classList.add('fadeOut', 'd-none');
          });
          i = 1;
          document.querySelectorAll('.-days- .-day-').forEach((box) => {
            setTimeout(() => {
              box.classList.remove('fadeOut', 'd-none');
              box.classList.add('fadeIn');
            }, 20 * i);
            i++;
          });
        }
      });

    const weekPicker = () => {
      let i = 0;
      let iteration = 1;

      let days = document.querySelectorAll('.-days- .-day-');
      if (iteration == 1) {
        document.getElementById('prevWeek').disabled = true;
        document.getElementById('nextWeek').disabled = false;
      }
      let col = days.length / 7; //кол-во строк
      //найдем текущую дату
      for (i = 0; i < days.length; i++) {
        if (days[i].classList.contains('-current-')) {
          b = Math.floor(i / 7);
          ost = i / 7;
          if (ost > 0) {
            iteration = b + 1;
          } else {
            iteration = b;
          }
          break;
        }
      }
      //найдем выбранную дату
      for (i = 0; i < days.length; i++) {
        if (days[i].classList.contains('-selected-')) {
          b = Math.floor(i / 7);
          ost = i / 7;
          if (ost > 0) {
            iteration = b + 1;
          } else {
            iteration = b;
          }
          break;
        }
      }

      for (i = 0; i < days.length; i++) {
        days[i].classList.remove('fadeIn');
        days[i].classList.add('fadeOut', 'd-none');
      }
      if (iteration == 1) {
        for (i = 0; i < 7; i++) {
          days[i].classList.remove('fadeOut', 'd-none');
          setTimeout(() => {
            days[i].classList.add('fadeIn');
          }, 30 * i);
        }
      }

      const updateDisplay = () => {
        for (i = 0; i < days.length; i++) {
          days[i].classList.remove('fadeIn');
          days[i].classList.add('fadeOut', 'd-none');
        }

        setTimeout(() => {
          for (i = iteration * 7 - 7; i < iteration * 7; i++) {
            days[i].classList.remove('fadeOut');
            days[i].classList.remove('d-none');
            days[i].classList.add('fadeIn');
          }
        }, 500);
      };
      const changeWeek = (direction) => {
        iteration = iteration + direction;
        if (iteration < 1 || iteration > col) {
          iteration = 1;
        }
        if (iteration == 1) {
          document.getElementById('prevWeek').disabled = true;
        } else {
          document.getElementById('prevWeek').disabled = false;
        }
        if (iteration == col) {
          document.getElementById('nextWeek').disabled = true;
        } else {
          document.getElementById('nextWeek').disabled = false;
        }
        updateDisplay();
      };

      document
        .getElementById('prevWeek')
        .addEventListener('click', () => changeWeek(-1));
      document
        .getElementById('nextWeek')
        .addEventListener('click', () => changeWeek(1));
      updateDisplay();
    };
    if (document.querySelector('.wrap-calendar').classList.contains('open')) {
      box.classList.remove('fadeOut', 'd-none');
      box.classList.add('fadeIn');
    } else {
      weekPicker();
    }
  }, 50);
});
