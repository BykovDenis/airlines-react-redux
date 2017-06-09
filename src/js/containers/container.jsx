import React, { Component } from 'react';
import { BrowserRouter as Router, browserHistory } from 'react-router-dom';
import routes from '../components/main-nav/index';

export default class ReactComponent extends Component {
  render() {
    return (
      <Router history={browserHistory} routes={routes} />
    );
  }
}

