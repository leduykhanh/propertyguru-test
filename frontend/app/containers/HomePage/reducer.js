import { fromJS } from 'immutable';
import * as constants from './constants';

const initialState = fromJS({
  list: [],
  isLoading: false,
  lineCount: 0,
  error: false,
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case constants.LOAD_DATA_SUCCESS:
      let newState = state
        .set('isLoading', false)
        .set('list', action.data.data)
        .set('error', false);
        if (action.data.lineCount) {
          newState = newState.set("lineCount", action.data.lineCount);
        }
      return newState;
    case constants.LOAD_DATA_ERROR: {
      return state
        .set('list', [])
        .set('isLoading', false)
        .set('error', true);
    }
    default:
      return state;
  }
}

export default homeReducer;
