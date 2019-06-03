import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import TaskCard from '../../../components/Card/Task';
import Skeleton from '../../../components/Card/Skeleton';

const TasksList = ({ list, isLoading, isLoadingNext, onOpenDetail }) => {
    return (
        <div className={cx('board-row')}>
            {isLoading
                ? (
                    [...Array(35).keys()].map((item, index) => (
                        <div key={index} className={cx('board-col')}>
                            <Skeleton />
                        </div>
                    ))
                ) : (
                    list.map((item, index) => (
                        <div key={index} className={cx('board-col')}>
                            <TaskCard
                                orderNumber={item.orderNumber}
                                createdDate={item.createdDate}
                                principalCompany_displayName={item.principalCompany_displayName}
                                principalCompany_INN={item.principalCompany_INN}
                                contract_max_price={item.contract_max_price}
                                status={item.status}
                                tasks={item.tasks || []}
                                onOpenDetail={onOpenDetail}
                            />
                        </div>
                    ))
                )}
            {isLoadingNext && [...Array(5).keys()].map((item, index) => (
                <div key={list.length + index} className={cx('board-col')}>
                    <Skeleton />
                </div>
            ))}
        </div>
    );
};

TasksList.propTypes = {
    list: PropTypes.array,
    isLoading: PropTypes.bool.isRequired,
    isLoadingNext: PropTypes.bool.isRequired,
    onOpenDetail: PropTypes.func.isRequired
};

export default TasksList;
