import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// модуль комбинирования работы нескольких актшионов
import { bindActionCreators } from 'redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { deepOrange500 } from 'material-ui/styles/colors';
import * as getActionData from '../redux/actions/actions';
// подгрузка компонентов
import SheduleDeparture from '../components/shedule-departure/';


class Departure extends Component {
  static get propTypes() {
    return {
      getData: PropTypes.object.isRequired,
      currentStore: PropTypes.object.isRequired,
    };
  }
  componentDidMount() {
    this.props.getData.getDepartingData();
  }
  render() {
    const muiTheme = getMuiTheme({
      palette: {
        accent1Color: deepOrange500,
      },
    });
    const departing = this.props.currentStore.Reducer.shedules.departing;
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <SheduleDeparture infoData={departing} />
      </MuiThemeProvider>
    );
  }
}

const getDataProps = dispatch => (
  { getData: bindActionCreators(getActionData, dispatch) }
);

export default connect(
  state => ({ currentStore: state }),
  getDataProps
)(Departure);
