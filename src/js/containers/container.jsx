import React, { Component } from 'react';
import { Link, Router, Route, IndexRoute, browserHistory } from 'react-router';
import Airports from './airptorts';
import Arrival from './arrival';
import Departure from './departure';

export default class ReactComponent extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <ul>
          <li><Link to="/">Airports</Link></li>
          <li><Link to="/arrival">Arrival</Link></li>
          <li><Link to="/departure">Departure</Link></li>
        </ul>
        <Route path="/" >
          <IndexRoute component={Airports} />
          <Route path="/arrival" component={Arrival} />
          <Route path="/departure" component={Departure} />
        </Route>
      </Router>
    );
  }
}

