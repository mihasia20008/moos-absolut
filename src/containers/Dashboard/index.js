import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import cx from 'classnames';

import DashboardFooter from '../../components/Dashboard/Footer';
import DashboardTasksBlock from '../../components/Dashboard/TasksBlock';

import {getDashboard, clearDashboard} from "../../redux/Dashboard/actions";

class Dashboard extends PureComponent {
  static propTypes = {
    onSelectTasks: PropTypes.func.isRequired,
    onCloseDashboard: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(getDashboard());
  }

  componentWillUnmount() {
    const {dispatch} = this.props;
    dispatch(clearDashboard());
  }

  handleSelectFilter = (typeId, clientId, clientName) => {
    const { onSelectTasks, onCloseDashboard } = this.props;
    onSelectTasks({
      taskType: typeId,
      principalCompanyId: clientId,
      clientName
    });
    onCloseDashboard('/tasks');
  };

  render() {
    const {total, clientsTotal, taskBlocks} = this.props;

    return (
      <div className={cx('container')}>
        <div className={cx('row')}>
          <div className={cx('col-12 dash')}>
            <h1 className={cx('dash__title')}>
              У вас <span className={cx('task-count')}>{total}</span> задач.
            </h1>
            <h2 className={cx('dash__subtitle')}>
              Мы сгруппировали их так, чтобы вы могли закрыть их максимально быстро.
            </h2>
            {taskBlocks.map((block) => (
              <DashboardTasksBlock
                key={block.id}
                id={block.id}
                name={block.title}
                total={block.total}
                list={block.clients}
                onSelectFilter={this.handleSelectFilter}
              />
            ))}
            <DashboardFooter list={clientsTotal}/>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({Dashboard}) => {
  return {
    isFetching: Dashboard.isFetching,
    total: Dashboard.total,
    clientsTotal: Dashboard.clients_total,
    taskBlocks: Dashboard.task_groups,
  };
};

export default connect(mapStateToProps)(Dashboard);
