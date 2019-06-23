import React, {Fragment} from 'react';
import cx from 'classnames';

const TextField = ({input: { value, ...inputProps }, label, disabled, defaultValue}) => (
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
    </div>
  </Fragment>
);

export default TextField;
