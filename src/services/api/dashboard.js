import axios from 'axios';

// import { SERVER } from '../constants';

export const getList = async () => {
    try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        const { data: { error_code: status, ...rest } } = await axios({
            method: 'GET',
            // url: `${SERVER.HOST}${SERVER.API_ENDPOINT}/login`,
            url: '/mocksApi/dashboard.json',
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
