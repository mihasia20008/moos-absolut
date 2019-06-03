import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { DateRangePicker } from 'react-date-range';
import { ru } from 'react-date-range/dist/locale';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

import { staticRanges, staticInputRanges } from './getStaticData';
import ClearButton from "../ClearButton";

class DatePicker extends PureComponent {
    static propTypes = {
        name: PropTypes.string.isRequired,
        defaultActive: PropTypes.shape({
            from: PropTypes.instanceOf(Date),
            to: PropTypes.instanceOf(Date),
        }),
        onSelectDate: PropTypes.func.isRequired,
        onClear: PropTypes.func.isRequired,
    };
    static defaultProps = {
        defaultActive: {
            from: new Date(),
            to: new Date(),
        },
    };

    state = {
        showPicker: false,
        selectCount: 0,
        startDate: this.props.defaultActive.from,
        endDate: this.props.defaultActive.to,
    };

    componentWillUnmount() {
        document.removeEventListener('click', this.handleOutsideClick, false);
    }

    static prepareInputValue(stateFrom, stateTo, propsFrom, propsTo) {
        if (stateFrom !== propsFrom && stateFrom === stateTo) {
            return `${DatePicker.convertDateValue(stateFrom)}/`;
        }
        if (stateFrom !== propsFrom && stateTo !== propsTo) {
            return `${DatePicker.convertDateValue(stateFrom)}/${DatePicker.convertDateValue(stateTo)}`;
        }
        return '';
    }

    static convertDateValue(value) {
        const date = new Date(value);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        return `${day}.${month}.${date.getFullYear()}`
    }

    handleSelect = (ranges) => {
        const { name } = this.props;
        const values = ranges[name];

        const selectCount = values.startDate === values.endDate ? 1 : 2;
        this.setState({
            startDate: values.startDate,
            endDate: values.endDate,
            selectCount,
        }, this.checkEndSelectDate);
    };

    checkEndSelectDate = () => {
        const { selectCount } = this.state;
        if (selectCount === 2) {
            this.handleEndSelect();
        }
    };

    handleEndSelect = () => {
        const { onSelectDate } = this.props;
        const { selectCount } = this.state;
        this.handleHidePicker();
        if (selectCount) {
            onSelectDate({ target: this.input });
        } else {
            this.handleClearField();
        }
    };

    handleFocusPicker = () => {
        document.addEventListener('click', this.handleOutsideClick, false);
        const { selectCount } = this.state;
        this.setState(Object.assign(
            {},
            { showPicker: true },
            selectCount !== 1 ? { selectCount: 0 } : {}
        ));
    };

    handleHidePicker = () => {
        document.removeEventListener('click', this.handleOutsideClick, false);
        this.setState({ showPicker: false });
    };

    handleOutsideClick = (event) => {
        if (this.picker && this.picker.contains(event.target)) return;
        this.handleEndSelect();
    };

    handleNativeType = () => ({});

    handleClearField = () => {
        const { name, onClear } = this.props;
        const { defaultActive } = DatePicker.defaultProps;
        this.setState({
            selectCount: 0,
            startDate: defaultActive.from,
            endDate: defaultActive.to,
        });
        onClear(name, {});
    };

    render() {
        const { selectCount, showPicker, startDate, endDate } = this.state;
        const { name, defaultActive } = this.props;

        const value = selectCount
            ? DatePicker.prepareInputValue(startDate, endDate, defaultActive.from, defaultActive.to)
            : '';
        const range = {
            key: name,
            startDate,
            endDate
        };

        return (
            <div
                className={cx('filter-input__picker-wrap')}
                ref={node => { this.picker = node; }}
            >
                <div className={cx('filter-input')}>
                    <i className={cx('icon icon-calendar')}/>
                    <input
                        ref={node => { this.input = node; }}
                        type="text"
                        className={cx('filter-input__input', {
                            'filter-input__input--active': showPicker
                        })}
                        name={name}
                        value={value}
                        placeholder="Даты"
                        autoComplete="off"
                        onChange={this.handleNativeType}
                        onFocus={this.handleFocusPicker}
                    />
                    <ClearButton
                        onClear={this.handleClearField}
                        isHidden={!value.length}
                    />
                </div>
                <div className={cx('filter-input__picker', {
                    'filter-input__picker--show': showPicker,
                })}>
                    <DateRangePicker
                        locale={ru}
                        staticRanges={staticRanges}
                        inputRanges={staticInputRanges}
                        color="#eb9a42"
                        rangeColors={['#eb9a42', '#3ecf8e', '#fed14c']}
                        ranges={[range]}
                        moveRangeOnFirstSelection={false}
                        onChange={this.handleSelect}
                    />
                </div>
            </div>
        );
    }
};

export default DatePicker;
