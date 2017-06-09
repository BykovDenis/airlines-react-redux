/**
 * Created by Denis on 08.06.2017.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DataTables from 'material-ui-datatables';
import tableColumns from './departure-table-settings';
import CustomDate from './../../helpers/custom-date';

export default class DataTableSheduleDeparture extends Component {
  static get defaultProps() {
    return {
      infoData: {}
    };
  }
  static get propTypes() {
    return {
      infoData: PropTypes.object.isRequired
    };
  }
  constructor(props) {
    super(props);
    this.state = { flightNumber: 0 };
  }
  componentDidMount() {
    this.getActualData();
  }
  componentWillReceiveProps() {
    this.getActualData();
  }

  /**
   * Проверка на наличие начальных данных
   */
  getActualData() {
    this.styles = require('./shedule-departure.scss');
    if (!this.props.infoData.scheduledFlights) {
      return;
    }
    this.tableData = this.getInitialDataTables(this.state.flightNumber);
  }
  /**
   * Инициализация табличного представления
   */
  getInitialDataTables(flag = true) {
    console.log(flag, 'for sorting');
    const scheduledFlights = this.props.infoData.scheduledFlights;
    const tableData = [];
    const objDate = new CustomDate();
    scheduledFlights.forEach((elem) => {
      tableData.push({
        carrierFsCode: elem.carrierFsCode,
        flightNumber: elem.flightNumber,
        departureAirportFsCode: elem.departureAirportFsCode,
        arrivalAirportFsCode: elem.arrivalAirportFsCode,
        departureTerminal: elem.departureTerminal,
        departureTime: objDate.getDateDDMMYYYYHHMM(elem.departureTime),
        arrivalTime: objDate.getDateDDMMYYYYHHMM(elem.arrivalTime),
        serviceType: elem.serviceType
      });
    });
    return tableData;
  }
  render() {
    return (
      <div>
        <h2> Departure </h2>
        <DataTables
          height={'auto'}
          selectable={false}
          showRowHover={true}
          columns={tableColumns}
          data={this.tableData}
          showCheckboxes={false}
          rowSizeList={[10, 30, 100, 500]}
          page={1}
          count={1000}
          sortable={true}
          onCellClick={this.handleCellClick}
          onSortOrderChange={this.handleSortOrderChange}
        />
      </div>
    );
  }
}
