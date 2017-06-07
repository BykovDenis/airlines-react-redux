/**
 * Created by Denis on 06.06.2017.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DataTables from 'material-ui-datatables';

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
    this.tableColumns = [
      {
        key: 'fs',
        label: 'Fs'
      }, {
        key: 'name',
        label: 'Name'
      }, {
        key: 'city',
        label: 'City'
      }, {
        key: 'cityCode',
        label: 'City Code'
      }, {
        key: 'countryName',
        label: 'Country Name'
      }, {
        key: 'regionName',
        label: 'Region Name'
      }, {
        key: 'localTime',
        label: 'Local Time'
      }, {
        key: 'latitude',
        label: 'Lat'
      }, {
        key: 'longitude',
        label: 'Lon'
      }, {
        key: 'active',
        label: 'Active'
      }
    ];
    this.tableData = [
      {
        fs: this.props.infoData[0].fs || '',
        name: this.props.infoData[0].name || '',
        city: this.props.infoData[0].city || '',
        cityCode: this.props.infoData[0].cityCode || '',
        countryName: this.props.infoData[0].countryName || '',
        regionName: this.props.infoData[0].regionName || '',
        localTime: this.props.infoData[0].localTime || '',
        latitude: this.props.infoData[0].latitude || '',
        longitude: this.props.infoData[0].longitude || '',
        active: this.props.infoData[0].active || 1,
      }
    ];
  }
  render() {
    return (
      <div>
        <h2> Airports </h2>
        <DataTables
          height={'auto'}
          selectable={false}
          showRowHover={true}
          columns={this.tableColumns}
          data={this.tableData}
          showCheckboxes={false}
          onCellClick={this.handleCellClick}
          onCellDoubleClick={this.handleCellDoubleClick}
          onFilterValueChange={this.handleFilterValueChange}
          onSortOrderChange={this.handleSortOrderChange}
          page={1}
          count={100}
        />
      </div>
    );
  }
}
