import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import TextField from '../../../components/TextField';
import DatePicker from '../../../components/DatePicker';
import Dropdown from '../../../components/Dropdown';
// import TextFieldWithAutoComplete from '../../../components/TextFieldWithAutoComplete';

class TasksFilter extends PureComponent {
  static propTypes = {
    isDisable: PropTypes.bool,
    isHidden: PropTypes.bool,
    filters: PropTypes.object,
    taskTypes: PropTypes.array,
    onChangeFilter: PropTypes.func.isRequired,
  };
  static defaultProps = {
    isDisable: false,
    isHidden: false,
  };

  getTaskTypes(taskTypes, activeTaskType = '') {
    const { filters, onChangeFilter } = this.props;
    let active = 0;
    const list = taskTypes.reduce((acc, taskType) => {
      if (taskType.group_name) {
        const preparedGroup = taskType.list.reduce((groupAcc, item, index) => {
          if (activeTaskType === item.id) {
            active = acc.length + index + 1;
          }
          return groupAcc.concat([{ type: 'group-item', id: item.id, name: item.name }]);
        }, []);
        return acc.concat([
          { type: 'group-name', id: null, name: taskType.group_name },
          ...preparedGroup,
        ]);
      }
      if (activeTaskType === taskType.id) {
        active = acc.length;
      }
      return acc.concat([{ type: 'item', id: taskType.id, name: taskType.name }]);
    }, [{ type: 'item', id: 'all', name: 'Все заявки' }]);

    if (list.length === 2) {
      active = 1;
      if (filters.taskType !== list[1].id) {
        onChangeFilter({ taskType: list[1].id });
      }
    }

    return { active, list };
  }

  handleClearField = (name, value) => this.props.onChangeFilter({[`${name}`]: value});

  handleSelectDropdown = (name, id) => {
    const {onChangeFilter} = this.props;
    if (id === 'all') {
      onChangeFilter({[`${name}`]: ''});
    } else {
      onChangeFilter({[`${name}`]: id});
    }
  };

  handleCheckboxSelect = ({target}) => {
    if (target.value === 'all') {
      this.handleClearField(target.name, '');
    } else {
      this.props.onChangeFilter({[`${target.name}`]: target.value});
    }
  };

  handleTypeText = ({target}) => this.props.onChangeFilter({[`${target.name}`]: target.value});

  handleSelectDate = ({target}) => {
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
    const {onChangeFilter} = this.props;
    onChangeFilter({[`${name}`]: value})
  };

  render() {
    const {isDisable, isHidden, filters, taskTypes} = this.props;

    const preparedTaskTypes = this.getTaskTypes(taskTypes, filters.taskType);

    return (
      <div
        className={cx('header-filter', {
          'disabled': isDisable,
          'hide': isHidden,
        })}
      >
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
        <TextField
          name="summaBG"
          placeholder="Сумма БГ"
          value={filters.summaBG}
          onChange={this.handleTypeText}
          onClear={this.handleClearField}
        />
        <TextField
          name="principalCompanyId"
          placeholder="Наименование клиента"
          value={filters.principalCompanyId}
          onChange={this.handleTypeText}
          onClear={this.handleClearField}
        />
        <Dropdown
          name="taskType"
          toggleClassName="filter-dropdown"
          defaultActive={preparedTaskTypes.active}
          list={preparedTaskTypes.list}
          onSelectItem={this.handleSelectDropdown}
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
