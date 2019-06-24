import React, {Fragment, PureComponent } from 'react';
import cx from 'classnames';
import { Field, FieldArray } from "redux-form";

import TextField from '../../TextField';
import CheckboxField from '../../CheckboxField';

class AccountInfo extends PureComponent {
  billRefs = [];

  scrollToItem = (index, event) => {
    event.preventDefault();
    console.log(this.billRefs[index].offsetTop);

    this.billRefs[index].scrollIntoView({
      behavior: 'smooth'
    });
  };

  renderAccount = (name, index) => {
    return (
      <Fragment key={index}>
        <hr />

        <div
          ref={(node) => { this.billRefs[index] = node; }}
          className={cx('block_head col-12')}
        >
          Счет №{index + 1}
        </div>

        <div className={cx('col-12')}>
          <Field
            name={`${name}.name`}
            label="Наименование банка"
            component={TextField}
          />
        </div>

        <div className={cx('col-6 col-md-4')}>
          <Field
            name={`${name}.bik`}
            label="БИК"
            component={TextField}
            disabled
          />
        </div>

        <div className={cx('col-6 col-md-4')}>
          <Field
            name={`${name}.bill`}
            label="Коррсчет"
            component={TextField}
            disabled
          />
        </div>

        <div className={cx('col-6 col-md-4')}>
          <Field
            name={`${name}.number`}
            label="Номер счета"
            component={TextField}
            disabled
          />
        </div>


        <div className={cx('col-12 justify-content-center')}>
          <Field
            name={`${name}.useInDocs`}
            id={`${name}.useInDocs`}
            type="checkbox"
            label="Использовать в документах"
            component={CheckboxField}
          />
        </div>

        <div className={cx('col-12 justify-content-center')}>
          <Field
            name={`${name}.cardTwo`}
            id={`${name}.cardTwo`}
            type="checkbox"
            label="Картотека №2"
            component={CheckboxField}
          />
        </div>
      </Fragment>
    );
  };

  renderAccountsList = ({ fields }) => fields.map((field, index) => this.renderAccount(field, index));

  render() {
    const { taskInfo } = this.props;
    const { accounts = [] } = taskInfo;

    return (
      <div className={cx('block_item row align-items-stretch')}>
        <div className={cx('block_head col-12')}>
          Счета
        </div>
        <div className={cx('col-12')}>
          <div className={cx('accounts')}>{
            accounts.map((account, index) => (
              <div key={index} className={cx('d-flex align-items-center account')}>
                <div className={cx('account__name')}>{account.name}</div>
                <a
                  href="javascript:void(0);"
                  className={cx('account__link')}
                  onClick={this.scrollToItem.bind(this, index)}
                >
                  {account.bill}
                </a>
              </div>
            ))
          }</div>
        </div>
        <FieldArray name="accounts" component={this.renderAccountsList} />
      </div>
    );
  }
}

export default AccountInfo;
