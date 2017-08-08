import React from 'react';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import browserHistory from 'react-router/lib/browserHistory';
import syncHistoryWithStore from 'react-router-redux/lib/sync';
import routerMiddleware from 'react-router-redux/lib/middleware';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { deepOrange500 } from 'material-ui/styles/colors';
import handleTransitions from 'redux-history-transitions';

import reducers from './redux/reducers';
// Импорт кастомных компонент
import Routes from './Routes';

const enhancer = handleTransitions(history);

const middlewares = [
  thunk,
  routerMiddleware(browserHistory),
];

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

let devTools;

if (process.env.NODE_ENV === 'development') {
  const { logger } = require('redux-logger');
  middlewares.push(logger);
  devTools = window.devToolsExtension ? window.devToolsExtension() : f => f;
} else {
  devTools = f => f;
}

const store = createStore(
  combineReducers(reducers),
  compose(
    applyMiddleware(...middlewares),
    devTools,
  ),
  enhancer,
);

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={muiTheme}>
      <Routes history={syncHistoryWithStore(browserHistory, store)} />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('component')
);
