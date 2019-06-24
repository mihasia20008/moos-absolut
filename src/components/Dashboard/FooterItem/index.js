import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from "classnames";

class FooterItem extends PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    onSelectFilter: PropTypes.func.isRequired,
  };

  handleSelectClient = () => {
    const { id, name, onSelectFilter } = this.props;
    onSelectFilter({ clientId: id, clientName: name });
  };

  render() {
    const { count, name } = this.props;

    return (
      <button
        className={cx('dash__footer-item')}
        onClick={this.handleSelectClient}
      >
        {count}
        <div className={cx('dash__footer-name')}>
          {name}
        </div>
      </button>
    );
  }
}

export default FooterItem;
