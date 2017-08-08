/**
 * Created by Denis on 18.04.2017.
 */
import handleActions from 'redux-actions/lib/handleActions';
import {
  GET_DATA,
  GET_AIRPORTS,
  GET_DEPARTING,
  GET_ARRIVING
} from '../constants/constants';
import initialState from '../initialState';

export default handleActions({
  [GET_DATA]: (state, action) => ({
    ...state,
    data: action.payload
  }),
  [GET_AIRPORTS]: (state, action) => ({
    ...state,
    airports: action.payload
  }),
  [GET_DEPARTING]: (state, action) => ({
    ...state,
    departing: action.payload
  }),
  [GET_ARRIVING]: (state, action) => ({
    ...state,
    arriving: action.payload
  })
}, initialState);
