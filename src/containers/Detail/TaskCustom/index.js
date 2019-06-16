import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import cx from 'classnames';

import CustomDetailMenu from '../../../components/CustomDetail/Menu';
import CustomDetailLoader from '../../../components/CustomDetail/Loader';

import { getTaskForm } from "../../../redux/Task/actions";

class TaskCustomDetail extends PureComponent {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    taskInfo: PropTypes.object,
    id: PropTypes.string.isRequired,
    locationQuery: PropTypes.string.isRequired,
    title: PropTypes.node,
  };

  static defaultProps = {
    taskInfo: {},
    title: <div className={cx('loading__item')} style={{ width: '100%' }} />,
  };

  componentDidMount() {
    const { id, dispatch } = this.props;
    dispatch(getTaskForm(id));
  }

  renderFormSection() {
    const { locationQuery } = this.props;

    switch (true) {
      case locationQuery.search(/\?section=account-information/) === 0: {
        return 'task section account-information';
      }
      default: {
        return 'task section main';
      }
    }
  }

  render() {
    const { isFetching, title, taskInfo } = this.props;

    return (
      <div className={cx('row no-gutters flex-nowrap task-form-container')}>
        <CustomDetailMenu
          title={title}
          sections={taskInfo.sections}
        />
        <div className={cx('task-form-wrap')}>{
          isFetching
            ? <CustomDetailLoader />
            : this.renderFormSection()
        }</div>
      </div>
    );
  }
}

const mapStateToProps = ({ Task }, ownProps) => {
  const { isFetching, task_name, ...restTaskInfo } = Task;

  return {
    isFetching,
    title: ownProps.title || task_name,
    taskInfo: restTaskInfo,
  };
};

export default connect(mapStateToProps)(TaskCustomDetail);
