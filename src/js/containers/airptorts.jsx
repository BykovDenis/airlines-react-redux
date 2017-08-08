/**
 * Created by Denis on 08.06.2017.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
// модуль комбинирования работы нескольких актшионов
import { bindActionCreators } from 'redux';
import * as getActionData from '../redux/actions';
// подгрузка компонентов
import DataTableAirports from '../components/airports/';

class Airports extends Component {
  componentDidMount() {
    this.props.getAirportsData();
  }
  render() {
    const airports = this.props.airports;
    return (
      <div>
        <DataTableAirports infoData={airports} />
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
)(Airports);
