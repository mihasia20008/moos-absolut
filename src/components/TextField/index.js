import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import ClearButton from '../ClearButton';

class TextField extends PureComponent {
    static propTypes = {
        name: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        onClear: PropTypes.func.isRequired,
        placeholder: PropTypes.string.isRequired,
        value: PropTypes.string,
    };

    static defaultProps = { value: '' };

    handleClearField = () => {
        const { name, onClear } = this.props;
        onClear(name, '');
    };

    render() {
        const { name, onChange, value, placeholder } = this.props;

        return (
            <div className={cx('filter-input')}>
                <i className={cx('icon icon-search')}/>
                <input
                    type="text"
                    className={cx('filter-input__input')}
                    placeholder={placeholder}
                    name={name}
                    value={value}
                    onChange={onChange}
                />
                <ClearButton
                    onClear={this.handleClearField}
                    isHidden={!value.length}
                />
            </div>
        );
    }
}

export default TextField;