import React, { PureComponent, Fragment } from 'react';
import cx from 'classnames';

class FileUpload extends PureComponent {

  handleFileUpload = (event) => {
    event.preventDefault();
    const { input: { onChange } } = this.props;
    onChange(event.target.files[0]);
  };

  render() {
    const { input: { value = {} }, text } = this.props;

    return (
      <Fragment>
        <label>{text}</label>
        <div className={cx('file-upload center')}>
          <input
            className={cx('file-upload__input')}
            type="file"
            onChange={this.handleFileUpload}
          />
          <div className={cx('file-upload__fake')}>
            <i className={cx('file-upload__icon')}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M14 13.5V8C14 6.93913 13.5786 5.92172 12.8284 5.17157C12.0783 4.42143 11.0609 4 10 4C8.93913 4 7.92172 4.42143 7.17157 5.17157C6.42143 5.92172 6 6.93913 6 8V13.5C6 15.2239 6.68482 16.8772 7.90381 18.0962C9.12279 19.3152 10.7761 20 12.5 20C14.2239 20 15.8772 19.3152 17.0962 18.0962C18.3152 16.8772 19 15.2239 19 13.5V4H21V13.5C21 15.7543 20.1045 17.9163 18.5104 19.5104C16.9163 21.1045 14.7543 22 12.5 22C10.2457 22 8.08365 21.1045 6.48959 19.5104C4.89553 17.9163 4 15.7543 4 13.5V8C4 6.4087 4.63214 4.88258 5.75736 3.75736C6.88258 2.63214 8.4087 2 10 2C11.5913 2 13.1174 2.63214 14.2426 3.75736C15.3679 4.88258 16 6.4087 16 8V13.5C16 14.4283 15.6313 15.3185 14.9749 15.9749C14.3185 16.6313 13.4283 17 12.5 17C11.5717 17 10.6815 16.6313 10.0251 15.9749C9.36875 15.3185 9 14.4283 9 13.5V8H11V13.5C11 13.8978 11.158 14.2794 11.4393 14.5607C11.7206 14.842 12.1022 15 12.5 15C12.8978 15 13.2794 14.842 13.5607 14.5607C13.842 14.2794 14 13.8978 14 13.5Z"
                  fill="black" />
              </svg>
            </i>
            <span>{value.name || 'Приложить документ'}</span>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default FileUpload;
