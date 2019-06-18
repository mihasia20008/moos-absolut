import * as types from './actionTypes';

const initialState = {
  isFetching: false,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case types.TASK_FETCH: {
      return {
        ...state,
        isFetching: true
      };
    }
    case types.TASK_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        ...action.data,
      };
    }
    case types.TASK_ERROR: {
      return {
        ...state,
        isFetching: false
      };
    }
    case types.TASK_CLEAR: {
      return {
        ...initialState
      };
    }
    default: {
      return state;
    }
  }
};
