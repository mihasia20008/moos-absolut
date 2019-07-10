import axios from 'axios';

import {SERVER} from '../constants';
import {prepareFiltersToQuery} from '../utility';

export const getData = async (filters = {}, limit = 42) => {
  try {
    const query = prepareFiltersToQuery(filters);
    console.log('tasks filter', query);
    await new Promise(resolve => setTimeout(resolve, 2000));
    const {data: {error_code: status, ...rest}} = await axios({
      method: 'GET',
      url: process.env.NODE_ENV === 'development'
        ? '/mocksApi/tasks.json'
        : `${SERVER.HOST}${SERVER.SPA_ENDPOINT}/task/list?limit=${limit}${query}`,
    });
    if (status === 0) {
      return {
        isSuccess: true,
        ...rest,
      };
    }
    return {
      isSuccess: false,
      needLogout: status === 5,
      message: rest.error,
    };
  } catch (err) {
    console.log(err);
    return {
      isSuccess: false,
      message: err.message,
    };
  }
};

export const getNextPage = async (page, filters = {}, limit = 30) => {
  try {
    const query = prepareFiltersToQuery(filters);
    const {data: {error_code: status, ...rest}} = await axios({
      method: 'GET',
      url: process.env.NODE_ENV === 'development'
        ? '/mocksApi/tasksNextPage.json'
        : `${SERVER.HOST}${SERVER.SPA_ENDPOINT}/task/list?page=${page}&limit=${limit}${query}`,
    });
    if (status === 0) {
      return {
        isSuccess: true,
        ...rest,
      };
    }
    return {
      isSuccess: false,
      needLogout: status === 5,
      message: rest.error,
    };
  } catch (err) {
    console.log(err);
    return {
      isSuccess: false,
      message: err.message,
    };
  }
};
