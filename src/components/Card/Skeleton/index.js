import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Overlay from '../../Overlay';

const Skeleton = ({ showLoader }) => {
    return (
        <div className={cx('board-item')}>
            <span className={cx('preloader-field')}>
                <span className={cx('preloader-field__bar')} style={{ width: '100%' }} />
            </span>
            <span className={cx('preloader-field')}>
                <span className={cx('preloader-field__bar')} style={{ width: '80%' }} />
            </span>
            <span className={cx('preloader-field preloader-field--big')}>
                <span className={cx('preloader-field__bar')} style={{ width: '100%' }} />
            </span>
            {showLoader && <Overlay />}
        </div>
    );
};

Skeleton.propTypes = { showLoader: PropTypes.bool };
Skeleton.defaultProps = { showLoader: false };

export default Skeleton;
