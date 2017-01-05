
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

  nextMonth() {
    const { currentMonth } = this.state;
    return this.setState({ currentMonth: currentMonth + 1 });
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

  renderWeeks(offset, lastDay) {
    const { currentMonth, currentYear } = this.state;
    const numOfWeeks = this.weekCount(currentMonth, currentYear);
    return [ ...Array(numOfWeeks) ].map((_, i) => <Week>
      { this.renderDays(i, offset, lastDay) }
    </Week>);
  }

  renderDays(week, offset, lastDay) {
    return [ ...Array(7) ].map((_, d) => this.renderDay(d + 1 + 7 * week - offset, lastDay));
  }

  renderDay(day, lastDay) {
    if ( day <= 0 || day > lastDay ) {
      return <Day />;
    }
    return <Day>{ day }</Day>;
  }

  render() {
    const { currentMonth, currentYear } = this.state;
    const offset = this.dayOfWeek(1, currentMonth, currentYear);
    const lastDay = this.lastDay(currentMonth, currentYear).getDate();
    return <div className={styles.root}>
      { this.renderWeekdays() }
      { this.renderWeeks(offset, lastDay) }
      <button onClick={::this.nextMonth}>Next</button>
    </div>
  }

}
