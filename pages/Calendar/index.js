
import Inferno from 'inferno';
import Component from 'inferno-component';

import Cookies from 'js-cookie';

import { Head, Title } from 'weave-head';

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

  static async getInitialProps({ cookies }) {
    return { cmonth: cookies.month, cyear: cookies.year };
  }

  constructor(props, ctx) {
    super(props, ctx);
    const { cmonth, cyear } = this.props;
    const { store: { dispatch, getState } } = this.context;
    if ( !isNaN(cmonth) && !isNaN(cyear) ) {
      dispatch({ type: 'set_month', month: parseInt(cmonth) });
      dispatch({ type: 'set_year', year: parseInt(cyear) });
    }
  }

  componentDidMount() {
    this.onKeypress = this.onKeypress.bind(this);
    window.addEventListener('keydown', this.onKeypress, false);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeypress, false);
  }

  onKeypress(e) {
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        return this.nextMonth();
      case 'ArrowLeft':
      case 'ArrowUp':
        return this.previousMonth();
    }
  }

  previousMonth() {
    const { store: { dispatch, getState } } = this.context;
    const { month: currentMonth, year: currentYear } = getState();
    if (currentMonth === 1) {
      Cookies.set('month', 12);
      Cookies.set('year', currentYear - 1);
      dispatch({ type: 'set_month', month: 12 });
      dispatch({ type: 'set_year', year: currentYear - 1 });
      return;
    }
    Cookies.set('month', currentMonth - 1);
    Cookies.set('year', currentYear);
    dispatch({ type: 'previous_month' });
  }

  nextMonth() {
    const { store: { dispatch, getState } } = this.context;
    const { month: currentMonth, year: currentYear } = getState();
    if (currentMonth === 12) {
      Cookies.set('month', 1);
      Cookies.set('year', currentYear + 1);
      dispatch({ type: 'set_month', month: 1 });
      dispatch({ type: 'set_year', year: currentYear + 1 });
      return;
    }
    Cookies.set('month', currentMonth + 1);
    Cookies.set('year', currentYear);
    dispatch({ type: 'next_month' });
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
      { this.weekdays.map(day => <Day>{ day.substring(0, 3) }</Day>) }
    </Week>
  }

  renderWeeks(offset, lastDay) {
    const { store: { getState } } = this.context;
    const { month: currentMonth, year: currentYear } = getState();
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
    const { store: { getState } } = this.context;
    const { month: currentMonth, year: currentYear } = getState();
    const offset = this.dayOfWeek(1, currentMonth, currentYear);
    const lastDay = this.lastDay(currentMonth, currentYear).getDate();
    return <div className={styles.root}>
      <Head>
        <Title>Calendar</Title>
      </Head>
      <div className={styles.header}>
        <button className={styles.button} onClick={::this.previousMonth}>
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 24 24" x="0px" y="0px"><path d="M15.486 4l-8.486 8.485 0.708 0.707 7.778 7.779 0.707-0.707-7.778-7.779 7.778-7.778z"></path></svg>
        </button>
        <h1>
          <span>{ this.months[currentMonth - 1] }</span>
          <span>{ currentYear }</span>
        </h1>
        <button className={styles.button} onClick={::this.nextMonth}>
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 24 24" x="0px" y="0px"><path d="M7.708 20.971l8.485-8.486-8.485-8.485-0.708 0.707 7.778 7.778-7.778 7.779z"></path></svg>
        </button>
      </div>
      <div className={styles.container}>
        { this.renderWeekdays() }
        { this.renderWeeks(offset, lastDay) }
      </div>
    </div>
  }

}
