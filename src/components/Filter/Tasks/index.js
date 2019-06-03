import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import TextField from '../../../components/TextField';
import DatePicker from '../../../components/DatePicker';
// import Dropdown from '../../../components/Dropdown';
// import TextFieldWithAutoComplete from '../../../components/TextFieldWithAutoComplete';

class TasksFilter extends PureComponent {
    static propTypes = {
        isDisable: PropTypes.bool,
        filters: PropTypes.object,
        onChangeFilter: PropTypes.func.isRequired,
    };
    static defaultProps = { isDisable: false };

    handleClearField = (name, value) => this.props.onChangeFilter({ [`${name}`]: value });

    handleSelectDropdown = (name, key) => {
        const { onChangeFilter } = this.props;
        if (name === 'orderTypeRefId' && key === 'all') {
            onChangeFilter({
                [`${name}`]: '',
                phaseId: '',
            });
            return;
        }
        if (key === 'all') {
            onChangeFilter({ [`${name}`]: '' });
        } else {
            onChangeFilter({ [`${name}`]: key });
        }
    };

    handleCheckboxSelect = ({ target }) => {
        if (target.value === 'all') {
            this.handleClearField(target.name, '');
        } else {
            this.props.onChangeFilter({ [`${target.name}`]: target.value });
        }
    };

    handleTypeText = ({ target }) => this.props.onChangeFilter({ [`${target.name}`]: target.value });

    handleSelectDate = ({ target }) => {
        const values = target.value.split('/');
        this.props.onChangeFilter({
            [`${target.name}`]: {
                from: values[0],
                to: values[1],
            },
        });
    };

    handleEndMovingSlider = (name, value) => {
        this.props.onChangeFilter({
            [`${name}`]: {
                from: value[0],
                to: value[1],
            },
        });
    };

    handleSearchSelect = (name, value) => {
        const { onChangeFilter } = this.props;
        onChangeFilter({ [`${name}`]: value })
    };

    render() {
        const { isDisable, filters } = this.props;

        return (
            <div className={cx('header-filter', { 'disabled': isDisable })}>
                <TextField
                    name="orderNumber"
                    placeholder="Номер заявки"
                    value={filters.orderNumber}
                    onChange={this.handleTypeText}
                    onClear={this.handleClearField}
                />
                <DatePicker
                    name="createdDate"
                    defaultActive={filters.createdDate}
                    onSelectDate={this.handleSelectDate}
                    onClear={this.handleClearField}
                />
                {/*<div className={cx('main-filter__control main-filter__control--icon-right')}>*/}
                    {/*<Dropdown*/}
                        {/*name="orderTypeRefId"*/}
                        {/*toggleClassName="btn btn-dropdown--hidden-border"*/}
                        {/*defaultActive={processesFilter.active}*/}
                        {/*list={processesFilter.list}*/}
                        {/*disabled={processesFilter.list.length < 3}*/}
                        {/*onSelectItem={this.handleSelectDropdown}*/}
                    {/*/>*/}
                    {/*<i className={cx('icon icon-chevron-down')} />*/}
                {/*</div>*/}
                {/*<div className={cx('main-filter__control main-filter__control--icon-right')}>*/}
                    {/*<Dropdown*/}
                        {/*name="phaseId"*/}
                        {/*toggleClassName="btn btn-dropdown--hidden-border"*/}
                        {/*defaultActive={phaseFilter.active}*/}
                        {/*list={phaseFilter.list}*/}
                        {/*disabled={phaseFilter.list.length < 3}*/}
                        {/*onSelectItem={this.handleSelectDropdown}*/}
                    {/*/>*/}
                    {/*<i className={cx('icon icon-chevron-down')} />*/}
                {/*</div>*/}
                {/*<TextFieldWithAutoComplete*/}
                    {/*name="principalCompanyId"*/}
                    {/*value={filters.principalCompanyId}*/}
                    {/*onSelect={this.handleSearchSelect}*/}
                    {/*onClear={this.handleClearField}*/}
                    {/*placeholder="Клиент"*/}
                    {/*classNames={{*/}
                        {/*container: cx('main-filter__control'),*/}
                        {/*input: cx('main-filter__control-field')*/}
                    {/*}}*/}
                {/*/>*/}
            </div>
        );
    }
}

export default TasksFilter;
