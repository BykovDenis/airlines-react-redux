import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// модуль комбинирования работы нескольких актшионов
import { bindActionCreators } from 'redux';
import * as getActionData from '../redux/actions/actions';
// подгрузка компонентов
import Airpots from '../components/airports/';
import SheduleArrival from '../components/shedule-arrival/';
import SheduleDeparture from '../components/shedule-departure/';


class ReactComponent extends Component {
  static get propTypes() {
    return {
      getData: PropTypes.object.isRequired,
      currentStore: PropTypes.object.isRequired,
    };
  }
  componentDidMount() {
    this.props.getData.getAirportsData();
    this.props.getData.getDepartingData();
    this.props.getData.getArrivingData();
  }
  render() {
    const airports = this.props.currentStore.Reducer.airports;
    const arriving = this.props.currentStore.Reducer.shedules.arriving;
    const departing = this.props.currentStore.Reducer.shedules.departing;
    return (
      <div>
        <SheduleArrival infoData={arriving} />
        <SheduleDeparture infoData={departing} />
        <Airpots infoData={airports} />
      </div>
    );
  }
}

const getDataProps = dispatch => (
  { getData: bindActionCreators(getActionData, dispatch) }
);

export default connect(
  state => ({ currentStore: state }),
  getDataProps
)(ReactComponent);
