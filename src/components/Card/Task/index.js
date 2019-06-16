import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

class TaskCard extends PureComponent {
  static propTypes = {
    orderNumber: PropTypes.string.isRequired,
    createdDate: PropTypes.string,
    principalCompany_displayName: PropTypes.string,
    principalCompany_INN: PropTypes.string,
    contract_max_price: PropTypes.string,
    status: PropTypes.string,
    tasks: PropTypes.array,
    tags: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })),
    title: PropTypes.string,
    selected: PropTypes.bool,
    onOpenDetail: PropTypes.func.isRequired,
  };

  static defaultProps = {
    principalCompany_INN: '&mdash;',
    contract_max_price: '&mdash;',
    status: '',
    tags: [],
    title: 'Текст задачи отсутствует',
    selected: false,
  };

  handleShowTaskDetail = ({target}) => {
    const {taskId, taskName} = target.dataset;
    const {onOpenDetail} = this.props;
    onOpenDetail(taskId, taskName);
  };

  handleSelectTask = () => {
    const {tasks, selected, onSelectTask} = this.props;
    onSelectTask(tasks[0].task_id, selected);
  };

  render() {
    const {
      selected,
      orderNumber,
      createdDate,
      principalCompany_displayName,
      principalCompany_INN,
      contract_max_price,
      tasks,
      tags,
      title,
    } = this.props;

    return (
      <div className={cx('board-item', {
        'active': selected
      })}>
        {tasks.length
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
                data-task-id={tasks[0].task_id}
                data-task-name={tasks[0].name}
                onClick={this.handleShowTaskDetail}
              >
                {tasks[0].name}
              </div>
            </Fragment>
          ) : (
            <div className={cx('board-item__title')}>
              {title}
            </div>
          )}
        <div className={cx('board-item__amount')}>
          {contract_max_price} руб.
        </div>
        <div className={cx('board-item__name')}>
          {principalCompany_displayName}
        </div>
        <div className={cx('board-item__inn')}>
          ИНН {principalCompany_INN}
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
            от {createdDate}
          </div>
        </div>
      </div>
    );
  }
}

export default TaskCard;
