import * as types from './actionTypes';
import { Tasks } from '../../services/api';

import { logoutProcess } from "../User/actions";
import {setErrorContent} from "../Error/actions";

export function getTasksList(filters) {
    return async dispatch => {
        try {
            dispatch({ type: types.TASKS_FETCH });
            const { isSuccess, ...res } = await Tasks.getData(filters);
            if (!isSuccess) {
                if (res.needLogout) {
                    dispatch(logoutProcess(res.message));
                    return;
                }
                throw new Error(res.message);
            }
            dispatch({ type: types.TASKS_SUCCESS, data: res });
        } catch (err) {
            console.log(err);
            dispatch(setErrorContent(err.message));
            dispatch({ type: types.TASKS_ERROR });
        }
    };
}

export function getNextTasksPage(page, filters) {
    return async dispatch => {
        try {
            dispatch({ type: types.NEXT_TASKS_FETCH });
            const { isSuccess, ...res } = await Tasks.getNextPage(page, filters);
            if (!isSuccess) {
                if (res.needLogout) {
                    dispatch(logoutProcess(res.message));
                    return;
                }
                throw new Error(res.message);
            }
            dispatch({ type: types.NEXT_TASKS_SUCCESS, data: res });
        } catch (err) {
            console.log(err);
            dispatch(setErrorContent(err.message));
            dispatch({ type: types.NEXT_TASKS_ERROR });
        }
    }
}

export function setTasksFilter(filters) {
    return dispatch => dispatch({ type: types.TASKS_SET_FILTER, data: { filters }});
}

export function clearAllFilters() {
    return dispatch => dispatch({ type: types.TASKS_CLEAR_FILTERS });
}
