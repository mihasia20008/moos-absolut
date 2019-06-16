import React from 'react';
import cx from 'classnames';

const CustomDetailLoader = () => (
  <div className={cx('task-form')}>
    <div className={cx('loading__block-in')}>
      <div className={cx('loading__block')}>
        <div className={cx('loading-item')} />
      </div>
      <div className={cx('loading__block')}>
        <div className={cx('loading__item')} style={{ width: '300px' }} />
        <div className={cx('loading__item')} style={{ width: '480px' }} />
      </div>
      <div className={cx('loading__block')}>
        <div className={cx('loading__item')} style={{ width: '240px' }} />
      </div>
    </div>
  </div>
);

export default CustomDetailLoader;
