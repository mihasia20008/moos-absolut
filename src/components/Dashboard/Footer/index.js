import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import FooterItem from '../FooterItem';

const DashboardFooter = ({list, onSelectFilter}) => {
  return (
    <div className={cx('dash__footer')}>
      <div className={cx('dash__footer-title')}>
        Больше всего задач по клиентам
      </div>
      <div className={cx('d-flex flex-wrap')}>{
        list.map((client, index) => (
          <FooterItem
            key={index}
            id={client.id}
            count={client.task_count}
            name={client.name}
            onSelectFilter={onSelectFilter}
          />
        ))
      }</div>
    </div>
  );
};

DashboardFooter.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    task_count: PropTypes.number,
  })),
  onSelectFilter: PropTypes.func.isRequired
};

DashboardFooter.defaultProps = {
  list: []
};

export default DashboardFooter;
