/**
 * Created by bykovdenis on 20.07.17.
 */
import React from 'react';
import Router from 'react-router/lib/Router';
import IndexRedirect from 'react-router/lib/IndexRedirect';
import Route from 'react-router/lib/Route';
import Airports from './containers/airptorts';
import SheduleArrival from './containers/arrival';
import SheduleDeparture from './containers/departure';
import App from './app';

export default function Routes({ history }) {
  return (
    <Router history={history} >
      <Route path="/airlines/" component={App}>
        <Route path="airports" component={Airports} />
        <Route path="arrival" component={SheduleArrival} />
        <Route path="departure" component={SheduleDeparture} />
        <IndexRedirect to="airports" />
      </Route>
    </Router>
  );
}
