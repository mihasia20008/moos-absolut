import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const CustomDetailHeader = ({ section, title, name, inn, kpp, ogrn }) => (
  <div className={cx('task-header')}>
    <h1 className={cx('task-header__title')}>
      <div className={cx('task-header__section')}>
        {section}
      </div>
      {title}
    </h1>
    <h2 className={cx('task-header__company')}>
      <span className={cx('task-header__company-name')}>{name}</span> ИНН {`${inn}`}, КПП {kpp}, ОГРН {ogrn}
    </h2>
    <hr/>
  </div>
);

CustomDetailHeader.propTypes = {
  section: PropTypes.string.isRequired,
  title: PropTypes.string,
  name: PropTypes.string,
  inn: PropTypes.string,
  kpp: PropTypes.string,
  ogrn: PropTypes.string,
};

CustomDetailHeader.defaultProps = {
  title: '',
  name: 'ООО «Пятёрочка»',
  inn: '—',
  kpp: '—',
  ogrn: '—',
};

export default CustomDetailHeader;
