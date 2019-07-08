import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import ClearButton from '../ClearButton';

import LoadingIcon from '../../static/img/loading.svg';

class TextField extends PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onClear: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string,
    isFetching: PropTypes.bool,
  };

  static defaultProps = {value: ''};

  state = {
    focused: false,
    typing: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isFetching && !this.props.isFetching) {
      if (prevState.typing && !prevState.focused) {
        this.setState({ typing: false });
      }
    }
  }

  handleFocusInput = () => this.setState({ focused: true });

  handleBlurInput = () => this.setState({ focused: false });

  handleChange = (event) => {
    this.setState({ typing: true });
    const { onChange } = this.props;
    onChange(event);
  };

  handleClearField = () => {
    const {name, onClear} = this.props;
    onClear(name, '');
  };

  render() {
    const {isFetching, name, value, placeholder} = this.props;
    const { typing } = this.state;

    return (
      <div className={cx('filter-input')}>
        {isFetching && typing
          ? <img className={cx('input-loader')} src={LoadingIcon} alt="" />
          : <i className={cx('icon icon-search')}/>}
        <input
          type="text"
          className={cx('filter-input__input')}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={this.handleChange}
          onFocus={this.handleFocusInput}
          onBlur={this.handleBlurInput}
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
