import axios from 'axios';

// import { SERVER } from '../constants';

export const getForm = async (id) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 1500));
    const prefix =
      id !== 'a2d08f72-62e9-11e9-a7d4-e205da6478d1' &&
      id !== 'df6f518e-56e3-11e9-add7-e205da6478d1'
        ? 'form'
        : id;

    const { data: { error_code: status, ...rest } } = await axios({
      method: 'GET',
      url: process.env.NODE_ENV !== 'production'
        ? `/mocksApi/${prefix}.json`
        : `/mocksApi/${prefix}.json` // todo replace on real api url
    });
    if (status === 0) {
      return {
        isSuccess: true,
        ...rest,
      };
    }
    return {
      isSuccess: false,
      needLogout: status === 2,
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
