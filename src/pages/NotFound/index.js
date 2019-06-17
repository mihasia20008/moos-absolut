import React, {Fragment} from 'react';
import cx from 'classnames';

const NotFound = ({text}) => {
  return (
    <div className={cx('error-page')}>
      <div className={cx('error-page__wrap')}>{}
        <div className={cx('error-page__title')}>возникла ошибка</div>
        {text ? (
          <Fragment>
            <div className={cx('error-page__number')}>400</div>
            <div className={cx('error-page__description')}>{text}</div>
          </Fragment>
        ) : (
          <Fragment>
            <div className={cx('error-page__number')}>404</div>
            <div className={cx('error-page__description')}>Страница не найдена</div>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default NotFound;
