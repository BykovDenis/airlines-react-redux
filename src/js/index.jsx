import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import thunk from 'redux-thunk';
import reducer from './redux/combineReducer';
// Импорт кастомных компонент
import ReactComponent from './containers/container';


const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <ReactComponent />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('component')
);
