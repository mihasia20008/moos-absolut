import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import cx from "classnames";

import ClearButton from "../ClearButton";
import ListItem from './blocks/ListItem';

import LoadingIcon from "../../static/img/loading.svg";

import {searchByString, clearSearchResults} from "../../redux/Search/actions";

class TextFieldWithAutoComplete extends PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired,
    onClear: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    defaultValue: PropTypes.string,
    value: PropTypes.string,
    classNames: PropTypes.shape({
      container: PropTypes.string,
      input: PropTypes.string
    }),
    meta: PropTypes.shape({
      touched: PropTypes.bool,
      error: PropTypes.string
    }),
    findAll: PropTypes.bool,
  };

  static defaultProps = {
    placeholder: '',
    defaultValue: '',
    value: '',
    classNames: {
      container: '',
      input: '',
      error: ''
    },
    meta: {
      touched: false,
      error: ''
    },
    findAll: false,
  };

  state = {
    focused: false,
    typing: false,
    value: this.props.value,
    showResult: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { defaultValue } = this.props;
    const { value } = this.state;

    if (!prevProps.defaultValue && defaultValue && defaultValue !== value) {
      this.setState({ value: defaultValue });
    }

    if (prevProps.isFetching && !this.props.isFetching) {
      if (prevState.typing && !prevState.focused) {
        this.setState({ typing: false });
      }
    }
  }

  handleClearField = (clearProps = true) => {
    const {dispatch, name, onClear} = this.props;
    this.setState({value: ''});
    if (clearProps) {
      onClear(name, '');
    }
    dispatch(clearSearchResults());
  };

  handleFocusInput = () => {
    this.setState({ focused: true });
    this.handleClearField(false);
    document.addEventListener('click', this.handleOutsideClick);
  };

  handleOutsideClick = ({target}) => {
    if (this.textField && this.textField.contains(target)) return;
    const { value: propsValue } = this.props;
    const { value: stateValue } = this.state;
    this.setState({ focused: false });
    if (propsValue && !stateValue) {
      this.handleClearField();
    } else {
      this.handleToggleResults();
    }
  };

  handleToggleResults = () => {
    const {dispatch} = this.props;
    dispatch(clearSearchResults());
    this.setState({showResult: false});
  };

  handleTypeValue = ({target}) => {
    const {value} = target;

    const showResult = !!value.length;
    const {findAll, dispatch} = this.props;
    this.setState({value, showResult: showResult});

    if (showResult) {
      dispatch(searchByString(value, findAll));
    } else {
      dispatch(clearSearchResults());
    }
  };

  handleSelectItem = (id, value) => {
    const {name, onSelect} = this.props;
    this.setState({value, showResult: false, typing: true});
    onSelect(name, id);
  };

  renderSearchResults() {
    const {list} = this.props;
    const {showResult, value} = this.state;

    if (!(list.length && showResult)) {
      return null;
    }

    return (
      <div className={cx('dropdown-menu', 'show')}>{
        list.map(item => (
          <ListItem
            key={typeof item.id === 'string' ? item.id : item.key}
            data={item.id}
            id={item.id}
            text={item.displayName}
            inn={item.INN}
            searchQuery={value}
            onClick={this.handleSelectItem}
          />
        ))
      }</div>
    );
  }

  render() {
    const {isFetching, name, classNames, placeholder, meta: {touched, error}} = this.props;
    const {value, typing} = this.state;

    return (
      <div
        className={cx('dropdown', classNames.container)}
        ref={node => {
          this.textField = node;
        }}
      >
        <div style={{ position: 'relative', height: '100%' }}>
          {isFetching && typing
            ? <img className={cx('input-loader')} src={LoadingIcon} alt="" />
            : <i className={cx('icon icon-search')}/>}
          <input
            type="text"
            autoComplete="off"
            className={classNames.input}
            placeholder={placeholder}
            name={name}
            value={value}
            onFocus={this.handleFocusInput}
            onChange={this.handleTypeValue}
          />
          <ClearButton
            onClear={this.handleClearField}
            isHidden={!value.length}
          />
          {this.renderSearchResults()}
        </div>
        {touched && error && <span className={classNames.error}>{error}</span>}
      </div>
    );
  }
}

const mapStateToProp = ({Search}) => {
  return {
    list: Search.list,
  };
};

export default connect(mapStateToProp)(TextFieldWithAutoComplete);
