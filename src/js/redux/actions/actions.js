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
  getAiports: `https://api.flightstats.com/flex/airports/rest/v1/jsonp/countryCode/${initialState.country}?callback=responseAirportsData&appId=${initialState.appid}&appKey=${initialState.apikey}`,
  getDeparting: `https://api.flightstats.com/flex/schedules/rest/v1/jsonp/from/SVO/departing/2017/06/08/12?callback=responseDepartingData&appId=68c7b8b1&appKey=${initialState.apikey}`,
  getArriving: `https://api.flightstats.com/flex/schedules/rest/v1/jsonp/to/SVO/arriving/2017/06/08/12?callback=responseArrivingData&appId=68c7b8b1&appKey=${initialState.apikey}`
};

const responseData = (data = initialState, dispatch) => {
  dispatch({
    type: constants.GET_DATA,
    payload: data
  });
};

/**
 * Получение данных по аэропортам
 * @param url
 * @param dispatch
 */
function loadJSONPAirportsData(url, dispatch) {
  /*
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
  */
  // for test import data from local api
  // Блок с данными от сервера, для тестирования чтобы не нагружать канал
  console.log(url);
  fetch('http://localhost:8080/data/response-airports-data.json')
    .then(response => response.json())
    .then((data) => {
      const mySchema = new schema.Entity('airports', {}, { idAttribute: 'fs' });
      const listSchema = [mySchema];
      const normalizeData = normalize(data, listSchema);
      dispatch({
        type: constants.GET_AIRPORTS,
        payload: normalizeData
      });
    })
    .catch(e => console.log(e));
}

function loadJSONPDepartingData(url, dispatch) {
  /*
  window.responseDepartingData = function responseDepartingData(data = initialState) {
    dispatch({
      type: constants.GET_DEPARTING,
      payload: data
    });
  };
  const script = document.createElement('script');
  script.src = url;
  document.body.appendChild(script);
  */
  // for test import data from local api
  // Блок с данными от сервера, для тестирования чтобы не нагружать канал
  console.log(url);
  fetch('http://localhost:8080/data/shedules_departing.json')
    .then(response => response.json())
    .then((data) => {
      dispatch({
        type: constants.GET_DEPARTING,
        payload: data
      });
    })
    .catch(e => console.log(e));
}

function loadJSONPArrivingData(url, dispatch) {
  /*
  window.responseArrivingData = function responseArrivingData(data = initialState) {
    dispatch({
      type: constants.GET_ARRIVING,
      payload: data
    });
  };
  const script = document.createElement('script');
  script.src = url;
  document.body.appendChild(script);
  */
  // for test import data from local api
  // Блок с данными от сервера, для тестирования чтобы не нагружать канал
  console.log(url);
  fetch('http://localhost:8080/data/shedules_arriving.json')
    .then(response => response.json())
    .then((data) => {
      dispatch({
        type: constants.GET_ARRIVING,
        payload: data
      });
    })
    .catch(e => console.log(e));
}

export const getActionData = () => (dispatch) => {
  responseData(initialState, dispatch);
};

export const getAirportsData = () => (dispatch) => {
  loadJSONPAirportsData(urls.getAiports, dispatch);
  loadJSONPAirportsData(urls.getAiports, dispatch);
  setInterval(() => {
    loadJSONPAirportsData(urls.getAiports, dispatch);
  }, timeout);
};

export const getDepartingData = () => (dispatch) => {
  loadJSONPDepartingData(urls.getDeparting, dispatch);
  loadJSONPDepartingData(urls.getDeparting, dispatch);
  setInterval(() => {
    loadJSONPDepartingData(urls.getDeparting, dispatch);
  }, timeout);
};

export const getArrivingData = () => (dispatch) => {
  loadJSONPArrivingData(urls.getArriving, dispatch);
  loadJSONPArrivingData(urls.getArriving, dispatch);
  setInterval(() => {
    loadJSONPArrivingData(urls.getArriving, dispatch);
  }, timeout);
};
