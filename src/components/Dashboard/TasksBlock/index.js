import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import TaskItem from '../TaskItem';

class TasksBlock extends PureComponent {
    static propTypes = {
        id: PropTypes.string.isRequired,
        onSelectFilter: PropTypes.func.isRequired,
        name: PropTypes.string,
        total: PropTypes.oneOfType([() => null, PropTypes.number]),
        list: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string,
            task_count: PropTypes.number,
        })),
    };

    static defaultProps = {
        name: '',
        total: null,
        list: [],
    };

    handleSelectTask = (clientId) => {
        const { id, onSelectFilter } = this.props;
        onSelectFilter(id, clientId);
    };

    render() {
        const { name, total, list } = this.props;
        return (
            <div className={cx('dash__block')}>
                <div className={cx('dash__block-title')}>
                    {name}
                    <span className={cx('task-count')}>{total}</span>
                </div>
                <div className={cx('d-flex flex-wrap')}>{
                    list.map((client) => (
                        <TaskItem
                            key={client.id}
                            id={client.id}
                            name={client.name}
                            count={client.task_count}
                            onSelectTask={this.handleSelectTask}
                        />
                    ))
                }</div>
            </div>
        );
    }
}

export default TasksBlock;
