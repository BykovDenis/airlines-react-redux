/**
 * Created by Denis on 06.06.2017.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Airport from './airport';

export default class Airports extends Component {
  static get defaultProps() {
    return {
      infoData: []
    };
  }
  static get propTypes() {
    return {
      infoData: PropTypes.array.isRequired
    };
  }
  constructor(props) {
    super(props);
    this.parseAirportsData = this.parseAirportsData.bind(this);
  }
  componentDidMount() {
    this.parseAirportsData();
  }
  componentWillReceiveProps() {
    this.parseAirportsData();
  }
  parseAirportsData() {
    this.airports = this.props.infoData.map(elem => <Airport data={elem} key={elem.fs} />);
  }
  render() {
    return (
      <div>
        <h2> Airports </h2>
        {this.airports}
      </div>
    );
  }
}
