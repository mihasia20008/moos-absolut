import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {CSSTransition} from "react-transition-group";
import cx from 'classnames';

import Modal from '../../containers/Modal';
import TasksFilter from '../../components/Filter/Tasks';
import TasksList from '../../components/List/Tasks';
import EmptyTasksList from '../../components/Empty/TasksList';
import TaskDetail from '../../components/Detail/Task';

import { getTasksList, getNextTasksPage, setTasksFilter, clearAllFilters } from '../../redux/Tasks/actions';
import { authenticationUser } from "../../redux/User/actions";

class Tasks extends PureComponent {
    static propTypes = {
        isFetching: PropTypes.bool.isRequired,
        isFetchingNext: PropTypes.bool.isRequired,
        list: PropTypes.array,
        filters: PropTypes.object,
        nextPage: PropTypes.number.isRequired,
        hasMorePage: PropTypes.bool.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    state = { isFixed: false };

    componentDidMount() {
        const { filters, dispatch } = this.props;

        dispatch(getTasksList(filters));
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillReceiveProps(nextProps) {
        const { filters, dispatch } = this.props;
        if (JSON.stringify(filters) !== JSON.stringify(nextProps.filters)) {
            dispatch(getTasksList(nextProps.filters));
        }
    }

    componentWillUnmount() {
        const { dispatch } = this.props;
        dispatch(clearAllFilters());
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = () => {
        const {
            list,
            filters,
            isFetchingNext,
            nextPage,
            hasMorePage,
            dispatch
        } = this.props;
        const { isFixed } = this.state;

        if (!isFixed && window.scrollY > 0) {
            this.setState({ isFixed: true });
        } else if (isFixed && window.scrollY === 0) {
            this.setState({ isFixed: false });
        }

        const container = document.querySelector('.block-list.block-list--tasks');
        if (!container) {
            return null;
        }

        const { height } = container.getBoundingClientRect();

        if (!isFetchingNext && list.length > 0 && hasMorePage && height - window.scrollY < 1000) {
            dispatch(getNextTasksPage(nextPage, filters));
        }
    };

    handleChangeFilter = (filters) => {
        const { dispatch } = this.props;
        dispatch(setTasksFilter(filters));
    };

    handleOpenDetail = (taskId, taskName) => {
        const { history, dispatch } = this.props;
        dispatch(authenticationUser(true))
            .then(() => history.push(`/tasks/${taskId}`, {
                title: taskName
            }))
            .catch(err => console.log(err));
    };

    renderTasksList() {
        const {
            list,
            isFetching,
            isFetchingNext,
        } = this.props;

        if (!list.length && !isFetching) {
            return <EmptyTasksList />;
        }

        return (
            <div className={cx('block-list', 'block-list--tasks')}>
                <div className={cx('board')}>
                    <div className={cx('container-fluid')}>
                        <TasksList
                            list={list}
                            isLoading={isFetching}
                            isLoadingNext={isFetchingNext}
                            onOpenDetail={this.handleOpenDetail}
                        />
                    </div>
                </div>
            </div>
        );
    }

    renderModalNode() {
        const {location: { state: routeState = {} }, history, match} = this.props;

        if (typeof match.params.id === 'undefined') {
            return null;
        }

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

    render() {
        const {
            list,
            filters,
        } = this.props;
        const { isFixed } = this.state;

        const contentNode = this.renderModalNode();

        return (
            <Fragment>
                <div className={cx('header', {
                    'fixed': isFixed
                })}>
                    <div className={cx('container-fluid')}>
                        <TasksFilter
                            isDisable={!list.length && !Object.keys(filters).length}
                            filters={filters}
                            onChangeFilter={this.handleChangeFilter}
                        />
                    </div>
                </div>
                {this.renderTasksList()}
                <CSSTransition
                    timeout={100}
                    in={Boolean(contentNode)}
                    classNames="fade"
                >
                    <div>{contentNode}</div>
                </CSSTransition>
            </Fragment>
        );
    }
}

const mapStateToProps = ({ Tasks }) => {
    return {
        isFetching: Tasks.isFetching,
        isFetchingNext: Tasks.isFetchingNext,
        list: Tasks.order,
        filters: Tasks.filters,
        nextPage: Tasks.page + 1,
        hasMorePage: Tasks.more,
    };
};

export default connect(mapStateToProps)(Tasks);
