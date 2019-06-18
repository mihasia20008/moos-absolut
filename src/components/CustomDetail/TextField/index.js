import React, {PureComponent} from 'react';
import cx from 'classnames';

import ClearButton from '../../ClearButton';

class TextField extends PureComponent {
  handleClearField = () => {
    const { input: { onChange } } = this.props;
    onChange('');
  };

  render() {
    const {input, label, disabled} = this.props;
    const isHiddenClearButton = Boolean(!input.value || disabled);

    return (
      <div className={cx('task-form__input-wrap')}>
        <label>{label}</label>
        <input
          type="text"
          className={cx('center')}
          disabled={disabled}
          {...input}
        />
        <ClearButton
          onClear={this.handleClearField}
          isHidden={isHiddenClearButton}
        />
      </div>
    );
  }
}

export default TextField;
