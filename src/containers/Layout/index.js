import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { withKeycloak } from 'react-keycloak';
import Cookies from 'js-cookie';

import Sidebar from '../Sidebar';
import Modal from '../Modal';
import FormAddTask from '../Form/AddTask';
import FormForgotPassword from '../Form/ForgotPassword';
import SnackBar from '../SnackBar';

import Overlay from '../../components/Overlay';

import { authenticationUser, setKeycloak } from '../../redux/User/actions';

import store from '../../redux/configureStore';
const { authType } = store.getState().User;

class Layout extends PureComponent {
    static propTypes = {
        component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
        authType: PropTypes.string.isRequired,
        isAuth: PropTypes.bool.isRequired,
        logout: PropTypes.bool.isRequired,
        isNotFound: PropTypes.bool,
        showSnackBar: PropTypes.bool.isRequired,
    };
    static defaultProps = {
        isNotFound: false,
    };

    state = {
        prevFetchStatus: false,
        keycloakAuth: false,
        keycloakFetch: true,
    };

    static getDerivedStateFromProps(props, state) {
        const { isFetching } = props;
        const { prevFetchStatus } = state;

        if (isFetching !== prevFetchStatus) {
            return {
                prevFetchStatus: isFetching,
            };
        }

        return {};
    }

    componentDidUpdate(prevProps, prevState) {
        const { authType, path: pathNow, location: locationNow, dispatch } = this.props;
        const { location: locationPrev } = prevProps;

        if (authType === 'keycloak') {
            const { keycloakAuth: nowKeycloakAuth } = this.state;
            const { keycloakAuth: prevKeycloakAuth } = prevState;

            if (!prevKeycloakAuth && nowKeycloakAuth) {
                dispatch(authenticationUser());
            }
        }

        if (pathNow === locationNow.pathname && locationNow.pathname !== locationPrev.pathname) {
            window.scrollTo(0, 0)
        }
    }

    componentDidMount() {
        const { authType, keycloak, isAuth, dispatch } = this.props;
        if (authType === 'keycloak') {
            if (keycloak.authenticated) {
                Cookies.set('JWT', keycloak.token);
                this.setState({ keycloakAuth: true, keycloakFetch: false });
                dispatch(setKeycloak(keycloak));
            }
        }
        if (authType === 'standard') {
            if (!isAuth) {
                dispatch(authenticationUser());
            }
        }
    }

    renderModalNode(props) {
        const { location: { search }, history } = props;

        switch (true) {
            case search === '?restore-password': {
                return (
                    <Modal
                        centerPosition
                        modalClass="restore-pass-form"
                        onCloseModal={history.goBack}
                    >
                        <FormForgotPassword
                            title="Изменение пароля"
                            buttonText="Изменить"
                            onCloseModal={history.goBack}
                        />
                    </Modal>
                );
            }
            case search.search(/\?add-task/) !== -1: {
                const addResult = search.match(/add-task=[a-z-]+/g);
                const definitionKey = addResult[0].split('=')[1];
                if (!definitionKey) {
                    return null;
                }

                return (
                    <Modal
                        topPosition
                        modalClass="modal-custom--wide-width"
                        preventOutsideClick
                        onCloseModal={() => history.go(-2)}
                    >
                        <FormAddTask
                            activeDefinitionKey={definitionKey}
                            onCloseModal={history.go}
                        />
                    </Modal>
                );
            }
            default: {
                return null;
            }
        }
    }

    render() {
        const { keycloakAuth, keycloakFetch, prevFetchStatus } = this.state;
        const {
            component: Component,
            isNotFound,
            authType,
            isAuth,
            logout,
            isFetching,
            showSnackBar,
            ...rest
        } = this.props;

        return (
            <Route {...rest} render={matchProps => {
                if (authType === 'keycloak') {
                    if (keycloakFetch) {
                        return <Overlay size="big" />;
                    }

                    if (!keycloakAuth) {
                        return (
                            <Redirect
                                to={{
                                    pathname: "/",
                                    search: "",
                                }}
                            />
                        );
                    }
                }

                if (authType === 'standard') {
                    if ((prevFetchStatus || logout) && !isFetching && !isAuth) {
                        return (
                            <Redirect
                                to={{
                                    pathname: "/",
                                    search: "",
                                }}
                            />
                        );
                    }

                    if (!isAuth) {
                        return <Overlay size="big" />;
                    }
                }

                const contentNode = this.renderModalNode(matchProps);

                return (
                    <Fragment>
                        {!isNotFound && <Sidebar />}
                        <Component {...matchProps} />
                        <CSSTransition
                            timeout={100}
                            in={Boolean(contentNode)}
                            classNames="fade"
                        >
                            <div>{contentNode}</div>
                        </CSSTransition>
                        {showSnackBar ? <SnackBar /> : null}
                    </Fragment>
                );
            }} />
        );
    }
}

const mapStateToProps = ({ User, Error }) => {
    return {
        authType: User.authType,
        isAuth: User.isAuth,
        logout: User.logout,
        isFetching: User.isFetching,
        showSnackBar: Error.show,
    };
};

const ConnectedLayout = connect(mapStateToProps)(Layout);

export default authType === 'keycloak'
    ? withKeycloak(ConnectedLayout)
    : ConnectedLayout;
