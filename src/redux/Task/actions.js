import * as types from "./actionTypes";

import { Task } from "../../services/api";

import { logoutProcess } from "../User/actions";
import { setErrorContent } from "../Error/actions";


export function getTaskForm(formId) {
  return async dispatch => {
    try {
      dispatch({ type: types.TASK_FETCH });
      const { isSuccess, ...res } = await Task.getForm(formId);
      if (!isSuccess) {
        if (res.needLogout) {
          dispatch(logoutProcess(res.message));
          return;
        }
        throw new Error(res.message);
      }
      dispatch({ type: types.TASK_SUCCESS, data: res });
    } catch (err) {
      console.log(err);
      dispatch(setErrorContent(err.message));
      dispatch({ type: types.TASK_ERROR });
    }
  };
}
