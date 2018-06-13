import {
  LOAD_DATA,
  LOAD_DATA_SUCCESS,
  LOAD_DATA_ERROR,
} from './constants';

/**
 * Load the data, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_DATA
 */
export function loadData(path, startIndex=0, pageSize=10, isFirstCall=false) {
  return {
    type: LOAD_DATA,
    payload: { path, startIndex, pageSize, isFirstCall }
  };
}

/**
 * Dispatched when the data are loaded by the request saga
 *
 * @param  {array} data The  data
 *
 * @return {object}      An action object with a type of LOAD_DATA_SUCCESS passing the DATA
 */
export function dataLoaded(data) {
  return {
    type: LOAD_DATA_SUCCESS,
    data,
  };
}

/**
 * Dispatched when loading the data fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_DATA_ERROR passing the error
 */
export function dataLoadingError(error) {
  return {
    type: LOAD_DATA_ERROR,
    error,
  };
}
