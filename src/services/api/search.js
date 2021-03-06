import axios from 'axios';

import {SERVER} from '../constants';

function createHash(string) {
  let hash = 0;
  if (string.length === 0) {
    return hash;
  }

  for (let i = 0; i < string.length; i++) {
    const chr = string.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }

  return `${-hash}`;
}

export const findByString = async (query) => {
  try {
    const {data: {error_code: status, ...rest}} = await axios({
      method: 'GET',
      url: process.env.NODE_ENV !== 'production'
        ? '/mocksApi/search.json'
        : `${SERVER.HOST}${SERVER.SPA_ENDPOINT}/company/search?q=${query}`
    });
    if (status === 0) {
      return {
        isSuccess: true,
        list: rest.company,
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
    }
  }
};

export const selectByString = async (query) => {
  try {
    const {data: {error_code: status, ...rest}} = await axios({
      method: 'GET',
      url: process.env.NODE_ENV === 'development'
        ? '/mocksApi/search.json'
        : `${SERVER.HOST}${SERVER.SPA_ENDPOINT}/company/select?q=${query}`
    });
    if (status === 0) {
      const preparedOther = rest.other.map((item) => ({
        ...item,
        id: {
          companyTypeRefId: item.companyTypeRefId,
          INN: item.INN,
          displayName: item.displayName,
          fullName: item.fullName,
        },
        key: createHash(new Date().getTime().toString())
      }));
      return {
        isSuccess: true,
        list: [
          ...rest.elastic,
          ...preparedOther,
        ],
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
    }
  }
};
