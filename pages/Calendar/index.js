
import Inferno from 'inferno';
import Component from 'inferno-component';

import Week from '../../components/Week';
import Day from '../../components/Day';

import styles from './styles.css';

export default class Calendar extends Component {

  weekdays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]

  months = [
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
  ]

  state = {
    currentMonth: new Date().getMonth() + 1,
    currentYear : new Date().getFullYear(),
  }

  daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }

  dayOfWeek(day, month, year) {
    return new Date(year, month - 1, day).getDay();
  }

  firstDay(month, year) {
    return new Date(year, month - 1, 1);
  }

  lastDay(month, year) {
    return new Date(year, month, 0);
  }

  weekCount(month, year) {
    const firstDay = this.firstDay(month, year);
    const lastDay = this.lastDay(month, year);
    const used = firstDay.getDay() + lastDay.getDate();
    return Math.ceil( used / 7);
  }

  renderWeekdays() {
    return <Week>
      { this.weekdays.map(day => <Day>{ day }</Day>) }
    </Week>
  }

  renderWeeks() {
    const { currentMonth, currentYear } = this.state;
    const numOfWeeks = this.weekCount(currentMonth, currentYear);
    return [ ...Array(numOfWeeks) ].map((_, i) => <Week>
      { this.renderDays(i) }
    </Week>);
  }

  renderDays(week) {
    return [ ...Array(7) ].map((_, d) => <Day>
      { d + 1 + 7 * week }
    </Day>);
  }

  render() {
    console.log(this.dayOfWeek(2, 1, 2017));
    return <div className={styles.root}>
      { this.renderWeekdays() }
      { this.renderWeeks() }
    </div>
  }

}
