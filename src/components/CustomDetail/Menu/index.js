import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { NavLink } from "react-router-dom";

class MenuItem extends PureComponent {
  handleCheckActive = (match, location) => {
    const { slug } = this.props;

    if (!slug && location.search) {
      return location.search.search(/\?client-deal/) !== -1
    }

    if (slug || location.search) {
      const regex = new RegExp(`section=${slug}`);
      return location.search.substr(1).search(regex) === 0;
    }

    return match;
  };

  render() {
    const { slug, isBig, children } = this.props;
    return (
      <NavLink
        isActive={this.handleCheckActive}
        activeClassName={cx('active')}
        className={cx('menu__link menu__section', {
          'menu__link--big': isBig
        })}
        to={{ search: slug ? `?section=${slug}` : '' }}
      >
        {children}
      </NavLink>
    );
  }
}

class CustomDetailMenu extends PureComponent {
  static propTypes = {
    title: PropTypes.node.isRequired,
    withHelp: PropTypes.bool,
    sections: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      items: PropTypes.arrayOf(PropTypes.shape({
        slug: PropTypes.string,
        name: PropTypes.string,
      }))
    })),
  };

  static defaultProps = {
    sections: [],
    withHelp: false
  };

  renderMenu() {
    const { sections } = this.props;

    return sections.map((section, index) => (
      <Fragment key={index}>
        <div className={cx('menu__section-title')}>
          {section.title}
        </div>
        {section.items.map(item => (
          <MenuItem
            key={item.slug}
            slug={item.slug}
          >
            {item.name}
          </MenuItem>
        ))}
      </Fragment>
    ))
  }

  render() {
    const { title, withHelp } = this.props;

    return (
      <div className="menu d-flex flex-column">
        <menu className={cx('menu__sections-list')}>
          <MenuItem isBig={!withHelp}>
            {withHelp && (
              <Fragment>
                <svg width="71" height="63" viewBox="0 0 71 63" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.99994 20.5502C19.1937 41.7812 38.7463 54.2889 64.9033 42.9592" stroke="#F56B6B"
                        strokeWidth="2" strokeLinecap="round" />
                  <path d="M52.5479 50.901L65.9925 42.6326L49.5954 42.9081" stroke="#F56B6B" strokeWidth="2"
                        strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className={cx('menu__section-help')}>
                  Текущая задача
                </span>
              </Fragment>
            )}
            {title}
          </MenuItem>
          {this.renderMenu()}
        </menu>
        <div className={cx('menu__actions-list')}>
          <a className={cx('menu__link menu__action')} href="">
            <i className={cx('menu__action-icon')}>
              <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd"
                      d="M3.59999 2.7V0H14.4V2.7H3.59999ZM0 7.2C0 5.715 1.215 4.5 2.7 4.5H15.3C16.785 4.5 18 5.715 18 7.2V12.6H14.4V16.2H3.6V12.6H0V7.2ZM15.3 6.30002C15.84 6.30002 16.2 6.66002 16.2 7.20002C16.2 7.74002 15.84 8.10002 15.3 8.10002C14.76 8.10002 14.4 7.74002 14.4 7.20002C14.4 6.66002 14.76 6.30002 15.3 6.30002ZM12.6 9.90001H5.40001V14.4H12.6V9.90001Z"
                      fill="#504E5B" />
              </svg>
            </i>
            Напечатать
          </a>
          <a className={cx('menu__link menu__action')} href="">
            <i className={cx('menu__action-icon')}>
              <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0V6.5625L13.5 7.875L0 9.1875V15.75L18 7.875L0 0Z" fill="#504E5B" />
              </svg>
            </i>
            Отправить ссылку
          </a>
        </div>
      </div>
    );
  }
}

export default CustomDetailMenu;
