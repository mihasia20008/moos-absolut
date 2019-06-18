import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const LoadDoc = ({ name, file }) => (
  <div className={cx('load-doc')}>
    {name}
    <a className={cx('load-doc__link')} href={file} download>
      <i className={cx('load-doc__icon')}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.25 14.25H15.75V15.75H2.25V14.25ZM9.75 6.75H15L9 12.75L3 6.75H8.25V0.75H9.75V6.75Z"
                fill="#EB9A42" />
        </svg>
      </i>
      Скачать PDF
    </a>
  </div>
);

LoadDoc.propTypes = {
  name: PropTypes.string.isRequired,
  file: PropTypes.string.isRequired,
};

export default LoadDoc;
