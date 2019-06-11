import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import _noop from 'lodash/noop';

const TasksGroupActions = ({ isActive, taskCount, onClearAll }) => {
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
                <button className={cx('header-action-btn header-action-btn--yes')}>
                    Стоп-факторы не выявлены
                </button>
                <button className={cx('header-action-btn header-action-btn--no')}>
                    Отказать в выдаче
                </button>
                <button className={cx('header-action-btn header-action-btn--repeat')}>
                    Повторить автоматический расчёт
                </button>
            </div>
        </div>
    );
};

TasksGroupActions.propTypes = {
    isActive: PropTypes.bool,
    taskCount: PropTypes.number.isRequired,
    onClearAll: PropTypes.func,
};

TasksGroupActions.defaultProps = {
    isActive: false,
    onClearAll: _noop,
};

export default TasksGroupActions;
