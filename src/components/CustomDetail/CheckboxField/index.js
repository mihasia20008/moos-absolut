import React from "react";
import cx from 'classnames';

const CheckboxField = ({ input, type, label, disabled, defaultValue }) => {
  const { checked, ...inputProps } = input;
  return (
    <label className={cx('checkbox')}>
      <input
        type={type}
        disabled={disabled}
        checked={checked || defaultValue}
        {...inputProps}
      />
      <span className={cx('checkbox__text')} />
      {label}
    </label>
  )
};

export default CheckboxField;
