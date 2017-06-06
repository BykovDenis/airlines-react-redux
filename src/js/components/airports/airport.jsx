/**
 * Created by Denis on 06.06.2017.
 */
import React from 'react';
import PropTypes from 'prop-types';

const Airport = ({ data }) => (
  <div>
    <div>
      {data.fs}
    </div>
    <div>
      {data.name}
    </div>
    <div>
      {data.city}
    </div>
    <div>
      {data.city}
    </div>
    <div>
      {data.cityCode}
    </div>
    <div>
      {data.countryName}
    </div>
    <div>
      {data.regionName}
    </div>
    <div>
      {data.localTime}
    </div>
    <div>
      {data.latitude}
    </div>
    <div>
      {data.longitude}
    </div>
    <div>
      {data.active}
    </div>
  </div>
);

Airport.defaultProps = {
  data: {}
};
Airport.PropTypes = {
  data: PropTypes.object
};

export default Airport;
