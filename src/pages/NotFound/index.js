import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';

import CONTENT from '../../contentConstants';

const NotFound = () => {
    return (
        <Fragment>
            <Link className={cx('logo')} to="/">
                <img className={cx('logo__img')} src="static/media/logo-min.svg" alt="logo" />
            </Link>
            <div className={cx('error-message')}>
                <p className={cx('error-message__title')}>Ошибка 404: страница не найдена</p>
                <Link className={cx('btn btn-secondary error-message__btn')} to="/">
                    На главную
                </Link>
                <span className={cx('error-message__text')}>
                    Поддержка:
                    <a
                        className={cx('error-message__phone')}
                        href={`tel:${CONTENT.PHONE.replace(/\+|\s|\(|\)|–|-/g, '')}`}
                    >
                        {CONTENT.PHONE}
                    </a>
                </span>
            </div>
        </Fragment>
    );
};

export default NotFound;
