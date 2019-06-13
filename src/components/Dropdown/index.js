import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

class Dropdown extends PureComponent {
  static propsTypes = {
    defaultActive: PropTypes.number,
    name: PropTypes.string.isRequired,
    list: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    })),
    onSelectItem: PropTypes.func.isRequired,
    toggleClassName: PropTypes.string,
    defaultText: PropTypes.string,
    disabled: PropTypes.bool,
    hideDefaultItem: PropTypes.bool,
  };
  static defaultProps = {
    defaultActive: 0,
    list: [],
    defaultText: '',
    hideDefaultItem: false,
  };

  state = {
    isOpen: false,
    activeIndex: this.props.defaultActive,
    mouseInMenu: false
  };

  componentWillReceiveProps(nextProps) {
    const {activeIndex: stateActive} = this.state;
    const {defaultActive: propsActive} = nextProps;
    if (stateActive !== propsActive && propsActive) {
      this.setState({activeIndex: propsActive});
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleOutsideClick, false);
  }

  handleToggleDropdown = () => {
    if (this.state.isOpen) {
      this.setState({isOpen: false});
      document.removeEventListener('click', this.handleOutsideClick);
    } else {
      this.setState({isOpen: true});
      document.addEventListener('click', this.handleOutsideClick);
    }
  };

  handleSelectItem = (index) => {
    const {name, list, onSelectItem} = this.props;
    this.setState({activeIndex: index, isOpen: false});
    document.removeEventListener('click', this.handleOutsideClick);
    onSelectItem(name, list[index].id, index);
  };

  handleOutsideClick = ({target}) => {
    if (this.dropdown && this.dropdown.contains(target)) return;
    this.handleToggleDropdown();
  };

  handleMouseEnterMenu = () => this.setState({ mouseInMenu: true });

  handleMouseLeaveMenu = () => this.setState({ mouseInMenu: false });

  renderToggleText() {
    const {activeIndex} = this.state;
    const {list, defaultText, hideDefaultItem} = this.props;

    if (hideDefaultItem) {
      if (activeIndex === 0) {
        return (
          <span className={cx('dropdown-toggle__default')}>
            {defaultText}
          </span>
        );
      }

      return list[activeIndex].name;
    }

    if (defaultText) {
      return `${defaultText} ${list[activeIndex].name.toLowerCase()}`;
    }

    if (activeIndex === 0) {
      return (
        <span className={cx('dropdown-toggle__default')}>
            {list[activeIndex].name}
          </span>
      );
    }

    return list[activeIndex].name;
  }

  render() {
    const {isOpen, activeIndex, mouseInMenu} = this.state;
    const {list, toggleClassName, disabled, hideDefaultItem} = this.props;

    return (
      <div className={cx('dropdown', {
        'show': isOpen,
        'disabled': disabled
      })} ref={node => {
        this.dropdown = node;
      }}>
        <button
          onClick={this.handleToggleDropdown}
          className={cx('btn-dropdown dropdown-toggle', toggleClassName)}
          type="button"
          data-toggle="dropdown"
        >
          {this.renderToggleText()}
          <div className={cx('dropdown-toggle__icon')}>
            <div className={cx('dropdown-toggle__icon-arrow')} />
          </div>
        </button>
        <div
          className={cx('dropdown-menu', {
            'show': isOpen,
            'hide-active': mouseInMenu
          })}
          onMouseEnter={this.handleMouseEnterMenu}
          onMouseLeave={this.handleMouseLeaveMenu}
        >{
          list.map((item, index) => {
            if (hideDefaultItem && index === 0) {
              return null;
            }
            if (item.type === 'group-name') {
              return (
                <span
                  key={item.name}
                  className={cx('dropdown-item dropdown-item--group')}
                >
                {item.name}
              </span>
              );
            }
            return (
              <span
                key={item.id}
                onClick={this.handleSelectItem.bind(this, index)}
                className={cx('dropdown-item', {
                  'dropdown-item--active': activeIndex === index,
                  'dropdown-item--group-item': item.type === 'group-item'
                })}
              >
                {item.name}
              </span>
            );
          })
        }</div>
      </div>
    );
  }
}

export default Dropdown;
