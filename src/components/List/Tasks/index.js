import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import TaskCard from '../../../components/Card/Task';
import Skeleton from '../../../components/Card/Skeleton';

const TasksList = ({ list, isLoading, isLoadingNext, selectedTasks, onOpenDetail, onSelectTask }) => {
    return (
        <div className={cx('board-row')}>
            {isLoading
                ?
                    [...Array(35).keys()].map((item, index) => (
                        <div key={index} className={cx('board-col')}>
                            <Skeleton />
                        </div>
                    ))
                :
                    list.map((item, index) => {
                        const tasks = item.tasks || [];
                        const isSelected = selectedTasks.some(selectedId => {
                            if (!tasks.length) {
                                return false;
                            }
                            return selectedId === tasks[0].task_id;
                        });
                        return (
                            <div key={index} className={cx('board-col')}>
                                <TaskCard
                                    selected={isSelected}
                                    orderNumber={item.orderNumber}
                                    createdDate={item.createdDate}
                                    principalCompany_displayName={item.principalCompany_displayName}
                                    principalCompany_INN={item.principalCompany_INN}
                                    contract_max_price={item.contract_max_price}
                                    status={item.status}
                                    tasks={tasks}
                                    tags={item.tags}
                                    onOpenDetail={onOpenDetail}
                                    onSelectTask={onSelectTask}
                                />
                            </div>
                        );
                    })
            }
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
    selectedTasks: PropTypes.arrayOf(PropTypes.string),
    isLoading: PropTypes.bool.isRequired,
    isLoadingNext: PropTypes.bool.isRequired,
    onOpenDetail: PropTypes.func.isRequired,
    onSelectTask: PropTypes.func.isRequired
};

export default TasksList;
