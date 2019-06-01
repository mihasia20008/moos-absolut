import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Link, Redirect } from 'react-router-dom';
import cx from 'classnames';
// import { CSSTransition } from 'react-transition-group';
import { withKeycloak } from 'react-keycloak';
import Cookies from 'js-cookie';

import Sidebar from '../Sidebar';
// import Modal from '../Modal';
// import AddModalSelect from '../AddModal/Select';
// import AddModalForm from '../AddModal/Form';
// import FormForgotPassword from '../Form/ForgotPassword';
// import FormSearch from '../Form/Search';
// import TaskDetail from '../Detail/Task';
import SnackBar from '../SnackBar';

import Overlay from '../../components/Overlay';

import { authenticationUser, setKeycloak } from '../../redux/User/actions';

import store from '../../redux/configureStore';
const { authType } = store.getState().User;

class Layout extends PureComponent {
    static propTypes = {
        component: PropTypes.func.isRequired,
        authType: PropTypes.string.isRequired,
        isAuth: PropTypes.bool.isRequired,
        logout: PropTypes.bool.isRequired,
        showAddTask: PropTypes.bool,
        isNotFound: PropTypes.bool,
        showSnackBar: PropTypes.bool.isRequired,
    };
    static defaultProps = {
        isNotFound: false,
        showAddTask: false,
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

    renderAddButton() {
        const { showAddTask } = this.props;

        if (showAddTask) {
            return (
                <div className={cx('btn-options')}>
                    <Link to="?add-task" className={cx('btn-options__link')} />
                </div>
            );
        }

        return null;
    }
    /*
    renderModalNode(props) {
        const { location: { search, state: routeState = {} }, history, match } = props;

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
            case search.search(/\?search/) !== -1: {
                const query = decodeURIComponent(search).split('=')[1];
                return (
                    <Modal
                        centerPosition
                        modalClass="modal-search"
                        onCloseModal={history.goBack}
                    >
                        <FormSearch defaultSearch={query} />
                    </Modal>
                );
            }
            case search.search(/\?add-task/) !== -1: {
                const addResult = search.match(/add-task=[a-z-]+/g);
                if (addResult) {
                    const definitionKey = addResult[0].split('=')[1];
                    return (
                        <Modal
                            topPosition
                            modalClass="modal-custom--wide-width"
                            preventOutsideClick
                            onCloseModal={() => history.go(-2)}
                        >
                            <AddModalForm
                                activeDefinitionKey={definitionKey}
                                onCloseModal={history.go}
                            />
                        </Modal>
                    );
                } else {
                    return (
                        <AddModalSelect
                            onCloseModal={history.goBack}
                            onProgrammingRedirect={history.push}
                        />
                    );
                }
            }
            case match.path.search('/tasks/') !== -1 && typeof match.params.id !== 'undefined': {
                const { title } = routeState;
                return (
                    <Modal
                        topPosition
                        modalClass="modal-custom--wide-width"
                        preventOutsideClick
                        onCloseModal={history.goBack}
                    >
                        <TaskDetail
                            id={match.params.id}
                            title={title}
                            onCloseDetail={history.goBack}
                        />
                    </Modal>
                );
            }
            default: {
                return null;
            }
        }
    }
    */
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

                // const contentNode = this.renderModalNode(matchProps);

                return (
                    <Fragment>
                        {!isNotFound && <Sidebar />}
                        <Component {...matchProps} />
                        {this.renderAddButton()}
                        {/*<CSSTransition*/}
                            {/*timeout={200}*/}
                            {/*in={Boolean(contentNode)}*/}
                            {/*classNames="fade"*/}
                        {/*>*/}
                            {/*<div>{contentNode}</div>*/}
                        {/*</CSSTransition>*/}
                        {showSnackBar ? <SnackBar /> : null}
                    </Fragment>
                );
            }} />
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const { User, Error } = state;

    return {
        showAddTask: ownProps.path && ownProps.path.search('/tasks') !== -1,
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
