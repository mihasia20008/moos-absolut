import * as types from './actionTypes';

const initialState = {
    isFetching: false,
    total: 0,
    clients_total: [],
    task_groups: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.DASHBOARD_GET_FETCH: {
            return {
                ...state,
                isFetching: true,
            };
        }
        case types.DASHBOARD_GET_ERROR: {
            return {
                ...state,
                isFetching: false
            };
        }
        case types.DASHBOARD_GET_SUCCESS: {
            return {
                ...state,
                isFetching: false,
                ...action.data,
            };
        }
        case types.DASHBOARD_CLEAR: {
            return { ...initialState };
        }
        default: {
            return state;
        }
    }
};
