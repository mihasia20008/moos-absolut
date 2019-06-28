import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

class TaskCard extends PureComponent {
  static propTypes = {
		taskId: PropTypes.string,
		taskName: PropTypes.string,
    orderNumber: PropTypes.string.isRequired,
    orderCreatedDate: PropTypes.string,
    principalDisplayName: PropTypes.string,
    principalINN: PropTypes.string,
    orderAmount: PropTypes.string,
    status: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })),
    selected: PropTypes.bool,
    onOpenDetail: PropTypes.func.isRequired,
  };

  static defaultProps = {
		taskId: null,
		taskName: null,
    principalINN: null,
    orderAmount: null,
    status: '',
    tags: [],
    selected: false,
  };

  handleShowTaskDetail = ({target}) => {
    const {taskId, taskName} = target.dataset;
    const {onOpenDetail} = this.props;
    onOpenDetail(taskId, taskName);
  };

  handleSelectTask = () => {
    const {taskId, selected, onSelectTask} = this.props;
    onSelectTask(taskId, selected);
  };

  render() {
    const {
			selected,
			taskId,
			taskName,
      orderNumber,
      orderCreatedDate,
      principalDisplayName,
      principalINN,
      orderAmount,
      tags
    } = this.props;

    return (
      <div className={cx('board-item', {
        'active': selected
      })}>
        {taskId
          ? (
            <Fragment>
              <div className={cx('board-item__checkbox')}>
                <label className={cx('checkbox')}>
                  <input
                    type={cx('checkbox')}
                    checked={selected}
                    onChange={this.handleSelectTask}
                  />
                  <span className={cx('checkbox__text')}/>
                </label>
              </div>
              <div
                className={cx('board-item__title')}
                data-task-id={taskId}
                data-task-name={taskName}
                onClick={this.handleShowTaskDetail}
              >
                {taskName}
              </div>
            </Fragment>
					) : null
				}
				{orderAmount
					? (
						<div className={cx('board-item__amount')}>
							{orderAmount} руб.
						</div>
					) : null
				}
        <div className={cx('board-item__name')}>
          {principalDisplayName}
        </div>
        <div className={cx('board-item__inn')}>
          ИНН {principalINN}
        </div>
        {tags.length ? (
          <div className={cx('board-item__status')}>{
            tags.map(tag => (
              <span key={tag.id}>
                {tag.name}
              </span>
            ))
          }</div>
        ) : null}
        <div className={cx('board-item__footer')}>
          <div className={cx('board-item__id')}>
            {orderNumber}
          </div>
          <div className={cx('board-item__date')}>
            от {orderCreatedDate}
          </div>
        </div>
      </div>
    );
  }
}

export default TaskCard;
