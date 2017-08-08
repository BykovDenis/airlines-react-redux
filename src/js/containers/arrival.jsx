import React, { Component } from 'react';
import { connect } from 'react-redux';
// модуль комбинирования работы нескольких актшионов
import { bindActionCreators } from 'redux';
import * as getActionData from '../redux/actions';
// подгрузка компонентов
import DataTableSheduleArrival from '../components/shedule-arrival/';

class SheduleArrival extends Component {
  componentDidMount() {
    this.props.getArrivingData();
  }
  render() {
    const arriving = this.props.arriving;
    return (
      <div>
        <DataTableSheduleArrival infoData={arriving} />
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
)(SheduleArrival);
