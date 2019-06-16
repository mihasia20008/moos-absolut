import React, {Fragment, PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {CSSTransition} from "react-transition-group";
import cx from 'classnames';

import Modal from '../../containers/Modal';
import Dashboard from '../../containers/Dashboard';
import TasksFilter from '../../components/Filter/Tasks';
import TasksGroupActions from '../../components/GroupActions/Tasks';
import TasksList from '../../components/List/Tasks';
import EmptyTasksList from '../../components/Empty/TasksList';
import TaskComundaDetail from '../../containers/Detail/TaskComunda';
import TaskCustomDetail from '../../containers/Detail/TaskCustom';

import {getTasksList, getNextTasksPage, setTasksFilter, clearAllFilters} from '../../redux/Tasks/actions';
import {authenticationUser} from "../../redux/User/actions";
import {Link} from "react-router-dom";

class Tasks extends PureComponent {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    isFetchingNext: PropTypes.bool.isRequired,
    list: PropTypes.array,
    filters: PropTypes.object,
    nextPage: PropTypes.number.isRequired,
    hasMorePage: PropTypes.bool.isRequired,
    taskTypes: PropTypes.array,
    dispatch: PropTypes.func.isRequired
  };

  state = {
    isFixed: false,
    selectedList: [],
  };

  componentDidMount() {
    const {filters, dispatch} = this.props;

    dispatch(getTasksList(filters));
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillReceiveProps(nextProps) {
    const {filters, dispatch} = this.props;
    if (JSON.stringify(filters) !== JSON.stringify(nextProps.filters)) {
      dispatch(getTasksList(nextProps.filters));
    }
  }

  componentWillUnmount() {
    const {dispatch} = this.props;
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
    const {isFixed} = this.state;

    if (!isFixed && window.scrollY > 0) {
      this.setState({isFixed: true});
    } else if (isFixed && window.scrollY === 0) {
      this.setState({isFixed: false});
    }

    const container = document.querySelector('.block-list.block-list--tasks');
    if (!container) {
      return null;
    }

    const {height} = container.getBoundingClientRect();

    if (!isFetchingNext && list.length > 0 && hasMorePage && height - window.scrollY < 1000) {
      dispatch(getNextTasksPage(nextPage, filters));
    }
  };

  handleChangeFilter = (filters) => {
    const {dispatch} = this.props;
    dispatch(setTasksFilter(filters));
  };

  handleOpenDetail = (taskId, taskName) => {
    const {history, dispatch} = this.props;
    dispatch(authenticationUser(true))
      .then(() => history.push(`/tasks/${taskId}`, {
        title: taskName
      }))
      .catch(err => console.log(err));
  };

  handleSelectTask = (id, remove) => {
    const {selectedList} = this.state;
    const newSelectedList = remove
      ? selectedList.filter(taskId => taskId !== id)
      : selectedList.concat(id);

    this.setState({selectedList: newSelectedList});
  };

  handleClearSelectedList = () => this.setState({selectedList: []});

  handleActionClick = (action) => {
    const {selectedList} = this.state;
    console.log(action, selectedList);
    alert(`Done action "${action}" with \n${JSON.stringify(selectedList)}`);
    this.handleClearSelectedList();
  };

  renderTasksList() {
    const {
      list,
      isFetching,
      isFetchingNext,
    } = this.props;
    const {selectedList} = this.state;

    if (!list.length && !isFetching) {
      return <EmptyTasksList/>;
    }

    return (
      <div className={cx('block-list', 'block-list--tasks')}>
        <div className={cx('board')}>
          <div className={cx('container-fluid')}>
            <TasksList
              selectedTasks={selectedList}
              list={list}
              isLoading={isFetching}
              isLoadingNext={isFetchingNext}
              onOpenDetail={this.handleOpenDetail}
              onSelectTask={this.handleSelectTask}
            />
          </div>
        </div>
      </div>
    );
  }

  renderButtons = () => {
    return (
      <Fragment>
        <div className={cx('btn-options')}>
          <Link to="?add-task=bg-pa-agent" className={cx('btn-options__link')}/>
        </div>
        <div className={cx('btn-magic')}>
          <Link to="?dashboard" className={cx('btn-magic__link')}/>
        </div>
      </Fragment>
    );
  };

  renderModalNode() {
    const {location: {state: routeState = {}, search}, history, match} = this.props;

    switch (true) {
      case search === '?dashboard': {
        return (
          <Modal
            topPosition
            modalClass="modal-custom--dashboard"
            preventOutsideClick
            onCloseModal={history.goBack}
          >
            <Dashboard
              onSelectTasks={this.handleChangeFilter}
              onCloseDashboard={history.push}
            />
          </Modal>
        );
      }
      case typeof match.params.id !== 'undefined': {
        const { title } = routeState;

        return (
          <Modal
            topPosition
            modalClass="modal-custom--custom-detail"
            preventOutsideClick
            onCloseModal={history.goBack}
          >
            <TaskCustomDetail
              id={match.params.id}
              locationQuery={search}
              title={title}
              onCloseDetail={history.goBack}
            />
          </Modal>
        );

        // return (
        //   <Modal
        //     topPosition
        //     modalClass="modal-custom--wide-width"
        //     preventOutsideClick
        //     onCloseModal={history.goBack}
        //   >
        //     <TaskComundaDetail
        //       id={match.params.id}
        //       title={title}
        //       onCloseDetail={history.goBack}
        //     />
        //   </Modal>
        // );
      }
      default: {
        return null;
      }
    }
  }

  render() {
    const {
      list,
      filters,
      taskTypes,
    } = this.props;
    const {isFixed, selectedList} = this.state;

    const contentNode = this.renderModalNode();

    const selectedTasksCount = selectedList.length;

    return (
      <Fragment>
        <div className={cx('header', {
          'fixed': isFixed
        })}>
          <div className={cx('container-fluid')}>
            <TasksFilter
              isDisable={!list.length && !Object.keys(filters).length}
              filters={filters}
              taskTypes={taskTypes}
              isHidden={Boolean(selectedTasksCount)}
              onChangeFilter={this.handleChangeFilter}
            />
            <TasksGroupActions
              taskCount={selectedTasksCount}
              isActive={Boolean(selectedTasksCount)}
              onClearAll={this.handleClearSelectedList}
              onActionClick={this.handleActionClick}
            />
          </div>
        </div>
        {this.renderTasksList()}
        {this.renderButtons()}
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

const mapStateToProps = ({Tasks}) => {
  return {
    isFetching: Tasks.isFetching,
    isFetchingNext: Tasks.isFetchingNext,
    list: Tasks.order,
    filters: Tasks.filters,
    nextPage: Tasks.page + 1,
    hasMorePage: Tasks.more,
    taskTypes: Tasks.task_types,
  };
};

export default connect(mapStateToProps)(Tasks);
