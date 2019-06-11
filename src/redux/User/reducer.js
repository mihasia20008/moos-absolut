import * as types from './actionTypes';
import Cookies from 'js-cookie';

import CONTENT from '../../contentConstants';

const initialState = {
    authType: CONTENT.authType,
    isFetching: false,
    isAuth: false,
    session_id: '0609cf1a137760800b59bcdc9aedf4dfc1542716228d925d0d9860847656b20b',
    logout: false,
    username: '',
    fullname: '',
    isclient: null,
    isagent: null,
    processDefinitionKeys: [],
    companyEmployees: [],
    keycloak: {},
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.LOGIN_FETCH:
        case types.LOGOUT_FETCH:
        case types.AUTH_FETCH: {
            return {
                ...state,
                isFetching: true,
                logout: false,
            };
        }
        case types.LOGIN_SUCCESS:
        case types.AUTH_SUCCESS: {
            return {
                ...state,
                isFetching: false,
                isAuth: true,
                ...action.data,
            };
        }
        case types.LOGOUT_SUCCESS: {
            return {
                ...initialState,
                logout: true,
                session_id: '',
            };
        }
        case types.LOGIN_ERROR:
        case types.LOGOUT_ERROR:
        case types.AUTH_ERROR: {
            return {
                ...state,
                isFetching: false,
                session_id: '',
            };
        }
        case types.SET_KEYCLOAK: {
            const { keycloak } = action;
            return {
                ...state,
                keycloak
            };
        }
        default: {
            return state;
        }
    }
}
