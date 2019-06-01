import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import CONTENT from '../../../contentConstants';

class TaskCard extends PureComponent {
    static propTypes = {
        orderNumber: PropTypes.string.isRequired,
        createdDate: PropTypes.string,
        principalCompany_displayName: PropTypes.string,
        principalCompany_INN: PropTypes.string,
        purchaseAmount: PropTypes.string,
        contract_max_price: PropTypes.string,
        status: PropTypes.string,
        tasks: PropTypes.array,
        onOpenDetail: PropTypes.func.isRequired,
    };

    static defaultProps = {
        principalCompany_INN: '&mdash;',
        purchaseAmount: '&mdash;',
        contract_max_price: '&mdash;',
        status: '',
    };

    handleShowTaskDetail = ({ target }) => {
        const { taskId, taskName } = target.dataset;
        const { onOpenDetail } = this.props;
        onOpenDetail(taskId, taskName);
    };

    renderStatusText() {
        const { status } = this.props;

        if (!status) {
            return null;
        }

        const { statusItems } = CONTENT;
        return statusItems.reduce((acc, { key, className, text }) => {
            return key === status ? text : acc;
        }, '');
    }

    render() {
        const {
            orderNumber,
            createdDate,
            principalCompany_displayName,
            principalCompany_INN,
            purchaseAmount,
            contract_max_price,
            tasks,
        } = this.props;

        return (
            <div className={cx('board-item')}>
                <div className={cx('board-item__checkbox')}>
                    <label className={cx('checkbox')}>
                        <input type={cx('checkbox')} />
                        <span className={cx('checkbox__text')} />
                    </label>
                </div>
                {tasks.length
                    ? (
                        <div
                            className={cx('board-item__title')}
                            data-task-id={tasks[0].task_id}
                            data-task-name={tasks[0].name}
                            onClick={this.handleShowTaskDetail}
                        >
                            {tasks[0].name}
                        </div>
                    ) : (
                        <div className={cx('board-item__title')}>
                            {this.renderStatusText()}
                        </div>
                    )}
                <div className={cx('board-item__amount')}>
                    2 000 000 руб.
                </div>
                <div className={cx('board-item__name')}>
                    {principalCompany_displayName}
                </div>
                <div className={cx('board-item__inn')}>
                    ИНН {principalCompany_INN}
                </div>
                <div className={cx('board-item__status')}>
                    <span>
                        исполнение
                    </span>
                    <span>
                        Новая
                    </span>
                    <span>
                        На экспертизе
                    </span>
                </div>
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
