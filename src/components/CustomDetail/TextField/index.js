import React, {Fragment, PureComponent} from 'react';
import cx from 'classnames';

import ClearButton from '../../ClearButton';

class TextField extends PureComponent {
  handleClearField = () => {
    const { input: { onChange } } = this.props;
    onChange('');
  };

  render() {
    const {input: { value, ...inputProps }, label, disabled, defaultValue} = this.props;
    const isHiddenClearButton = Boolean(!value || disabled);

    return (
      <Fragment>
        <label>{label}</label>
        <div className={cx('task-form__input-wrap')}>
          <input
            type="text"
            className={cx('center')}
            disabled={disabled}
            value={value || defaultValue}
            {...inputProps}
          />
          <ClearButton
            onClear={this.handleClearField}
            isHidden={isHiddenClearButton}
          />
        </div>
      </Fragment>
    );
  }
}

export default TextField;
