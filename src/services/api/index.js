import axios from 'axios';

import * as Tasks from './tasks';
import * as User from './user';
import * as Search from './search';
import * as Dashboard from './dashboard';
import * as Task from './task';

import store from '../../redux/configureStore';

axios.interceptors.request.use(async (config) => {
    try {
        const { User } = store.getState();
        const { settings: { authType } } = User;
        if (authType === 'standard') {
            const {session_id} = User;
            if (session_id) {
                const {url} = config;
                const [location, params = ''] = url.split('?');
                let kvp = params.split('&');
                let i = kvp.length;
                let x;
                while (i--) {
                    x = kvp[i].split('=');
                    if (x[0] === 'session_id') {
                        x[1] = session_id;
                        kvp[i] = x.join('=');
                        break;
                    }
                }

                if (i < 0) {
                    kvp.push(['session_id', session_id].join('='));
                }
                config.url = [location, kvp.join('&')].join('?');
            }
        }
        return config;
    } catch (err) {
        console.log(err);
        return config;
    }
});


export {
    Tasks,
    User,
    Search,
    Dashboard,
    Task,
};
