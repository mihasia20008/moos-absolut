import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

class TaskItem extends PureComponent {
    static propTypes = {
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        count: PropTypes.number.isRequired,
        onSelectTask: PropTypes.func.isRequired,
    };

    handleSelectTask = () => {
        const { id, onSelectTask } = this.props;
        onSelectTask(id);
    };

    render() {
        const { name, count } = this.props;
        return (
            <button
                type="button"
                className={cx('dash__item')}
                onClick={this.handleSelectTask}
            >
                {name}
                <span>{count}</span>
            </button>
        );
    }
}

export default TaskItem;
