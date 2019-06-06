import * as types from './actionTypes';

import { logoutProcess } from "../User/actions";
import { setErrorContent } from "../Error/actions";

import { Dashboard } from "../../services/api";

export function getDashboard() {
    return async dispatch => {
        try {
            dispatch({ type: types.DASHBOARD_GET_FETCH });
            const { isSuccess, ...res } = await Dashboard.getList();
            if (!isSuccess) {
                if (res.needLogout) {
                    dispatch(logoutProcess(res.message));
                    return;
                }
                throw new Error(res.message);
            }
            dispatch({ type: types.DASHBOARD_GET_SUCCESS, data: res });
        } catch (err) {
            console.log(err);
            dispatch(setErrorContent(err.message));
            dispatch({ type: types.DASHBOARD_GET_ERROR });
        }
    };
}

export function clearDashboard() {
    return dispatch => dispatch({ type: types.DASHBOARD_CLEAR });
}
