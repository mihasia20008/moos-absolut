import axios from 'axios';

// import { SERVER } from '../constants';

export const getList = async () => {
    try {
        console.log(process.env.NODE_ENV);
        await new Promise(resolve => setTimeout(resolve, 1500));
        const { data: { error_code: status, ...rest } } = await axios({
            method: 'GET',
            url: process.env.NODE_ENV === 'development'
              ? '/mocksApi/dashboard.json'
              : '/mocksApi/dashboard.json' // todo replace on real api url
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
