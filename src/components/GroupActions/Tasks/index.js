import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import _noop from 'lodash/noop';

const TasksGroupActions = ({ isActive, taskCount, onClearAll, onActionClick }) => {
    return (
        <div
            className={cx('header-action', {
                'active': isActive
            })}
        >
            <div className={cx('header-action-result')}>
                <button
                    type="button"
                    className={cx('header-action-result__close')}
                    onClick={onClearAll}
                />
                <div className={cx('header-action-result__title')}>
                    Выбрано: <span>{taskCount}</span>
                </div>
            </div>
            <div className={cx('header-action-actions')}>
                <button
                    type="button"
                    className={cx('header-action-btn header-action-btn--yes')}
                    onClick={onActionClick.bind(this, 'yes')}
                >
                    Стоп-факторы не выявлены
                </button>
                <button
                    type="button"
                    className={cx('header-action-btn header-action-btn--no')}
                    onClick={onActionClick.bind(this, 'no')}
                >
                    Отказать в выдаче
                </button>
                <button
                    type="button"
                    className={cx('header-action-btn header-action-btn--repeat')}
                    onClick={onActionClick.bind(this, 'repeat')}
                >
                    Повторить автоматический расчёт
                </button>
            </div>
        </div>
    );
};

TasksGroupActions.propTypes = {
    isActive: PropTypes.bool,
    taskCount: PropTypes.number.isRequired,
    onActionClick: PropTypes.func.isRequired,
    onClearAll: PropTypes.func,
};

TasksGroupActions.defaultProps = {
    isActive: false,
    onClearAll: _noop,
};

export default TasksGroupActions;
