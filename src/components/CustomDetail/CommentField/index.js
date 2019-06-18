import React from 'react';
import cx from 'classnames';

const CommentField = ({ input, author = '', disabled }) => {
  const avatar = author.split(' ').reduce((acc, chunk) => {
    if (!chunk) {
      return acc;
    }
    return acc + chunk[0].toUpperCase();
  }, '');

  return (
    <div className={cx('col-12 comment')}>
      <div className={cx('d-flex align-items-center comment__author')}>
        <div className={cx('comment__avatar')}>
          <span>
              {avatar}
          </span>
        </div>
        <span className={cx('comment__info-text')}>Комментарий от</span>&nbsp;{author}
      </div>
      <textarea className={cx('comment__input')} disabled={disabled} {...input} />
    </div>
  );
};

export default CommentField;

