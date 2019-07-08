import React, { Fragment } from 'react';
import cx from 'classnames';

const CustomDetailLoader = () => (
  <Fragment>
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
  </Fragment>
);

export default CustomDetailLoader;
