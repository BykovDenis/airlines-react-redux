import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// модуль комбинирования работы нескольких актшионов
import { bindActionCreators } from 'redux';
import RaisedButton from 'material-ui/RaisedButton';
import * as getActionData from '../redux/actions/actions';
// подгрузка компонентов
import Button from '../components/button/button';
import Airpots from '../components/airports/';


class ReactComponent extends Component {
  static get propTypes() {
    return {
      getData: PropTypes.object.isRequired,
      currentStore: PropTypes.object.isRequired,
    };
  }
  componentWillMount() {
    this.props.getData.getActionData();
    this.props.getData.getAirportsData();
  }
  render() {
    return (
      <div>
        custom component
        <br />
        <Button
          btnProps={{
            label: this.props.currentStore.Reducer.btnLabel,
            type: 'default'
          }}
        />
        <br />
        <RaisedButton label="Default" />
        <br />
        <Airpots infoData={this.props.currentStore.Reducer.airports} />
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
