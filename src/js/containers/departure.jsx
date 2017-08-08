import React, { Component } from 'react';
import { connect } from 'react-redux';
// модуль комбинирования работы нескольких актшионов
import { bindActionCreators } from 'redux';
import * as getActionData from '../redux/actions';
// подгрузка компонентов
import SheduleDeparture from '../components/shedule-departure/';

class ShedulesDeparture extends Component {
  componentDidMount() {
    this.props.getDepartingData();
  }
  render() {
    const departing = this.props.departing;
    return (
      <div>
        <SheduleDeparture infoData={departing} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state.airlines;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(getActionData, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShedulesDeparture);
