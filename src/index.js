import React, { PureComponent } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import Cookies from "js-cookie";

import { KeycloakProvider } from 'react-keycloak';
import { keycloak } from './services/utility';

import './static/scss/style.scss';

import Overlay from './components/Overlay';
import NotFound from './pages/NotFound';

import routes from './routes.js';
import store from './redux/configureStore';

import { getAppSettings } from "./redux/User/actions";

class App extends PureComponent {
    state = {
        settingsFetch: true,
        settings: {},
    };

    handleKeycloakError = (...arg) => {
        console.log(arg);
    };

    handleKeycloakToken = (token) => Cookies.set('JWT', token);

    componentDidMount() {
        const { settings, settingsFetch } = store.getState().User;

        this.setState({ settings, settingsFetch });

        this.unsubscribe = store.subscribe(this.handleUpdateAppSettings);
        store.dispatch(getAppSettings());
    }

    componentWillUnmount() {
        if (this.unsubscribe) {
            this.unsubscribe()
        }
    }

    handleUpdateAppSettings = () => {
        const { settingsFetch: prevSettingsFetch } = this.state;
        const { settings, settingsFetch } = store.getState().User;

        if (prevSettingsFetch !== settingsFetch && !settingsFetch) {
            this.setState({ settings, settingsFetch });
            this.unsubscribe();
        }
    };

    renderApp = () => {
        return (
            <Provider store={store}>
                <Router>
                    {routes}
                </Router>
            </Provider>
        );
    };

    render() {
        const { settings, settingsFetch } = this.state;
        console.log(settings, settingsFetch);

        if (settings.authType === 'standard') {
            return this.renderApp();
        }

        if (settings.authType === 'keycloak') {
            return (
                <KeycloakProvider
                    keycloak={keycloak}
                    initConfig={{ onLoad: "login-required" }}
                    onError={this.handleKeycloakError}
                    onToken={this.handleKeycloakToken}
                >
                    {this.renderApp()}
                </KeycloakProvider>
            );
        }

        if (!settingsFetch) {
            return <NotFound text="Ошибка загрузки настроек приложения!" />;
        }

        return <Overlay size="big" />;
    }
}

render(
    <App />,
    document.getElementById('root')
);
