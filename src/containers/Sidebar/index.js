import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withKeycloak } from "react-keycloak";

import UserMenu from '../../components/UserMenu';

import { logoutUser } from '../../redux/User/actions';

import store from '../../redux/configureStore';
const { authType } = store.getState().User;

class Sidebar extends PureComponent {
    static propTypes = {
        authType: PropTypes.string.isRequired,
        name: PropTypes.string,
        dispatch: PropTypes.func.isRequired,
    };
    static defaultProps = {
        name: '',
    };

    handleLogout = () => {
        const { authType, dispatch } = this.props;
        dispatch(logoutUser(authType));
    };

    render() {
        const { name } = this.props;

        return (
            <UserMenu
                name={name}
                onLogout={this.handleLogout}
            />
        );
    }
}

const mapStateToProps = ({ User }) => {
    return {
        authType: User.authType,
        name: User.fullname,
    };
};

const ConnectedSidebar = connect(mapStateToProps)(Sidebar);

export default authType === 'keycloak'
    ? withKeycloak(ConnectedSidebar)
    : ConnectedSidebar;
