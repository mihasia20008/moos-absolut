import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import TaskCard from '../../../components/Card/Task';
import Skeleton from '../../../components/Card/Skeleton';

import LoadingIcon from './loading.svg';

const TasksList = ({list, isLoading, isLoadingNext, selectedTasks, onOpenDetail, onSelectTask}) => {
  return (
    <Fragment>
      <div className={cx('board-row')}>
        {isLoading
          ?
            [...Array(35).keys()].map((item, index) => (
              <div key={index} className={cx('board-col')}>
                <Skeleton/>
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
                    title={item.title}
                    onOpenDetail={onOpenDetail}
                    onSelectTask={onSelectTask}
                  />
                </div>
              );
            })
        }
      </div>
      {isLoadingNext && (
        <div className={cx('board-load')}>
          <img className={cx('board-loader')} alt="" src={LoadingIcon} />
          Загрузка данных
        </div>
      )}
    </Fragment>
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
