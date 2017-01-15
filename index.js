
import Inferno from 'inferno';
import Component from 'inferno-component';

import { Router, Route } from 'weave-router';

import Calendar from './pages/Calendar';

function month(state = new Date().getMonth() + 1, action) {
  switch (action.type) {
  case 'next_month':
    return state + 1;
  case 'previous_month':
    return state - 1;
  case 'set_month':
    return action.month;
  default:
    return state;
  }
}

function year(state = new Date().getFullYear(), action) {
  switch (action.type) {
  case 'next_year':
    return state + 1;
  case 'previous_year':
    return state - 1;
  case 'set_year':
    return action.year;
  default:
    return state;
  }
}

const reducers = {
  month,
  year,
};

export default () => <Router reducers={reducers}>
  <Route path="/" component={Calendar} />
  <Route path="*" component={Calendar} />
</Router>
