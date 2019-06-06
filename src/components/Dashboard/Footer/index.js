import React from 'react';
import cx from 'classnames';

const DashboardFooter = ({ list }) => {
    return (
        <div className={cx('dash__footer')}>
            <div className={cx('dash__footer-title')}>
                Больше всего задач по клиентам
            </div>
            <div className={cx('d-flex flex-wrap')}>{
                list.map((client, index) => (
                    <div key={index} className={cx('dash__footer-item')}>
                        {client.task_count}
                        <div className={cx('dash__footer-name')}>
                            {client.name}
                        </div>
                    </div>
                ))
            }</div>
        </div>
    );
};

export default DashboardFooter;
