import React from 'react';
import cx from 'classnames';

const NotFound = () => {
    return (
        <div className={cx('error-page')}>
            <div className={cx('error-page__wrap')}>
                <div className={cx('error-page__title')}>возникла ошибка</div>
                <div className={cx('error-page__number')}>404</div>
                <div className={cx('error-page__description')}>Страница не найдена</div>
            </div>
        </div>
    );
};

export default NotFound;
