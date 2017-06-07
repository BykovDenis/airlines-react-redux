/**
 * Created by Denis on 06.06.2017.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DataTables from 'material-ui-datatables';
import * as settings from './airportsTableSetting';

export default class Airports extends Component {
  static get defaultProps() {
    return {
      infoData: []
    };
  }
  static get propTypes() {
    return {
      infoData: PropTypes.object.isRequired
    };
  }
  constructor(props) {
    super(props);
    this.handleCellClick = this.handleCellClick.bind(this);
    this.handleSortOrderChange = this.handleSortOrderChange.bind(this);
  }
  componentWillMount() {
    this.getActualData();
  }
  componentWillReceiveProps() {
    this.getActualData();
  }
  /**
   * Инициализация табличного представления
   */
  getActualData() {
    this.styles = require('./airports.scss');
    if (!this.props.infoData.result) {
      return;
    }
    this.tableData = [];
    const airports = this.props.infoData.entities.airports;
    const arrResult = this.props.infoData.result.sort();
    arrResult.forEach((elem) => {
      this.tableData.push({
        fs: airports[elem].fs || '',
        name: airports[elem].name || '',
        city: airports[elem].city || '',
        cityCode: airports[elem].cityCode || '',
        countryName: airports[elem].countryName || '',
        regionName: airports[elem].regionName || '',
        localTime: this.getDate(airports[elem].localTime),
        latitude: airports[elem].latitude.toFixed(4) || '',
        longitude: airports[elem].longitude.toFixed(4) || '',
        active: airports[elem].active ? 1 : 0,
      });
    });
  }
  /**
   * Преобразование строкого представления даты к виду dd.mm.yyyy hh:mm
   * @param dateString
   * @returns {string}
   */
  getDate(dateString) {
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = (date.getUTCMonth() + 1) < 10 ? `0${date.getUTCMonth() + 1}` : date.getUTCMonth();
    const dateOfMonth = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const hours = date.getUTCHours() < 10 ? `0${date.getUTCHours()}` : date.getUTCHours();
    const minutes = date.getUTCMinutes() < 10 ? `0${date.getUTCMinutes()}` : date.getUTCMinutes();
    return `${dateOfMonth}.${month}.${year} ${hours}:${minutes}`;
  }
  /**
   * Обработка клика по ячейке
   * @param rowIndex
   * @param columnIndex
   */
  handleCellClick(rowIndex, columnIndex) {
    console.log(`rowIndex: ${rowIndex} columnIndex: ${columnIndex}`);
  }
  /**
   * Обработка клика сортировки данных
   * @param key
   * @param order
   */
  handleSortOrderChange(key, order) {
    console.log(`key: ${key} order: ${order}`);
  }
  render() {
    return (
      <div>
        <h2> Airports </h2>
        <DataTables
          height={'auto'}
          selectable={false}
          showRowHover={true}
          columns={settings.tableColumnsSortStyle}
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
