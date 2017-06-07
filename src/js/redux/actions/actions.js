/**
 * Created by Denis on 18.04.2017.
 */
import { normalize, schema } from 'normalizr';

import * as constants from '../constants/constants';
import initialState from '../initialState/initialState';

require('es6-promise').polyfill();
require('isomorphic-fetch');

const timeout = 150000;

const urls = {
  getAiports: `https://api.flightstats.com/flex/airports/rest/v1/jsonp/countryCode/${initialState.country}?callback=responseAirportsData&appId=${initialState.appid}&appKey=${initialState.apikey}`
};

const responseData = (data = initialState, dispatch) => {
  dispatch({
    type: constants.GET_DATA,
    payload: data
  });
};

// Загружаем переменную в память
function loadJSONData(url, dispatch) {
  window.responseAirportsData = function responseAirportsData(data = initialState) {
    const mySchema = new schema.Entity('airports', {}, { idAttribute: 'fs' });
    const listSchema = [mySchema];
    const normalizeData = normalize(data, listSchema);
    dispatch({
      type: constants.GET_AIRPORTS,
      payload: normalizeData
    });
  };
  const script = document.createElement('script');
  script.src = url;
  document.body.appendChild(script);
}

export const getActionData = () => (dispatch) => {
  responseData(initialState, dispatch);
};

export const getAirportsData = () => (dispatch) => {
  loadJSONData(urls.getAiports, dispatch);
  loadJSONData(urls.getAiports, dispatch);
  setInterval(() => {
    loadJSONData(urls.getAiports, dispatch);
  }, timeout);
};
