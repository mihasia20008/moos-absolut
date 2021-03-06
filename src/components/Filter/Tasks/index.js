import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import TextField from '../../TextField';
import DatePicker from '../../DatePicker';
import Dropdown from '../../Dropdown';
import TextFieldWithAutoComplete from '../../TextFieldWithAutoComplete';

class TasksFilter extends PureComponent {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
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

  handleClearField = (name, value) => {

    this.props.onChangeFilter(Object.assign(
      {},
      {
        [`${name}`]: value,
      },
      name === 'principalCompanyId' ? {
        clientName: ''
      } : {}
    ));
  };

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
    const {isFetching, isDisable, isHidden, filters, taskTypes} = this.props;

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
          isFetching={isFetching}
          onChange={this.handleTypeText}
          onClear={this.handleClearField}
        />
        <DatePicker
          name="orderCreatedDate"
          defaultActive={filters.orderCreatedDate}
          isFetching={isFetching}
          onSelectDate={this.handleSelectDate}
          onClear={this.handleClearField}
        />
        <TextField
          name="summaBG"
          placeholder="Сумма БГ"
          value={filters.summaBG}
          isFetching={isFetching}
          onChange={this.handleTypeText}
          onClear={this.handleClearField}
        />
        <TextFieldWithAutoComplete
          name="principalCompanyId"
          defaultValue={filters.clientName}
          value={filters.principalCompanyId}
          isFetching={isFetching}
          onSelect={this.handleSearchSelect}
          onClear={this.handleClearField}
          placeholder="Наименование клиента"
          classNames={{
            container: cx('filter-input'),
            input: cx('filter-input__input')
          }}
        />
        <Dropdown
          name="taskType"
          toggleClassName="filter-dropdown"
          defaultActive={preparedTaskTypes.active}
          list={preparedTaskTypes.list}
          onSelectItem={this.handleSelectDropdown}
        />
      </div>
    );
  }
}

export default TasksFilter;
