import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Highlighter from "react-highlight-words";
import { Link } from 'react-router-dom';

class ListItem extends PureComponent {
    static propTypes = {
        data: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({
            companyTypeRefId: PropTypes.string.isRequired,
            INN: PropTypes.string.isRequired,
            displayName: PropTypes.string.isRequired,
            fullName: PropTypes.string.isRequired,
        })]).isRequired,
        text: PropTypes.string.isRequired,
        inn: PropTypes.string,
        onClick: PropTypes.func.isRequired,
        searchQuery: PropTypes.string,
    };

    handleClick = () => {
        const { data, text, onClick } = this.props;
        onClick(data, text);
    };

    render() {
        const { id, text, inn, searchQuery } = this.props;

        return (
            <div className={cx('dropdown-item')}>
                <div
                  className={cx('filter__info')}
                  onClick={this.handleClick}
                >
                    <Highlighter
                      className={cx('filter__title')}
                      highlightClassName="autocomplete__identity"
                      searchWords={[searchQuery]}
                      autoEscape={true}
                      textToHighlight={text}
                    />
                    {inn && (
                      <Highlighter
                        className={cx('filter__inn')}
                        highlightClassName="autocomplete__identity"
                        searchWords={[searchQuery]}
                        autoEscape={true}
                        textToHighlight={`ИНН ${inn}`}
                      />
                    )}
                </div>
                {id && (
                  <Link to={`?client-deal=${id}`} className={cx('filter__link')}>
                      Сделки (4)
                  </Link>
                )}
            </div>
        );
    }
}

export default ListItem;
