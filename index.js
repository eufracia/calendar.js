
import Inferno from 'inferno';
import Component from 'inferno-component';

import { Router, Route } from 'weave-router';

import Calendar from './pages/Calendar';

export default () => <Router>
  <Route path="/" component={Calendar} />
  <Route path="*" component={Calendar} />
</Router>
