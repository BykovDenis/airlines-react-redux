import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { BrowserRouter as Router, browserHistory, Route } from 'react-router-dom';
import reducer from './redux/combineReducer';
// Импорт кастомных компонент
// import ReactComponent from './containers/container';
import Airports from './containers/airptorts';
import SheduleArrival from './containers/arrival';
import SheduleDeparture from './containers/departure';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Airports} >
        <Route path="/arrival" component={SheduleArrival} />
        <Route path="/departure" component={SheduleDeparture} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('component')
);
